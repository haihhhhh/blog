---
id: jvm_set_hashcode
title: 【转】jvm设置hashcode生成方式
slug: /jvm/jvm_set_hashcode
date: 2017-12-29
authors: laohai
tags: [jvm,转载]
keywords: [jvm,转载]
---


HotSpot VM默认不使用对象地址来实现identity hash code，所以楼主的问题是基于一个不存在的前提来问的——“（如果对象使用创建时的地址来实现identity hash code，那么）老生代的对象与新生代的对象会不会共用了相同的地址作为hashcode？” 
<!-- truncate -->

[这帖](http://rednaxelafx.iteye.com/blog/461787)里我提到过VM实现identity hash code的几种可能性。确实有VM使用对象地址来实现它的，特别是使用不移动对象的GC的VM，例如现在的Google Dalvik VM的默认配置： 

~~~c++
// vm/native/java_lang_Object.cpp  
/* 
 * public int hashCode() 
 */  
static void Dalvik_java_lang_Object_hashCode(const u4* args, JValue* pResult)  
{  
    Object* thisPtr = (Object*) args[0];  
    RETURN_INT(dvmIdentityHashCode(thisPtr));  
}  
  
// vm/Sync.cpp  
#ifndef WITH_COPYING_GC  
u4 dvmIdentityHashCode(Object *obj)  
{  
    return (u4)obj;  
}  
#else  
...  
~~~

但Dalvik之所以可以这样做有很重要的前提条件，就是它默认的GC不移动对象，是个基于mark-sweep算法实现的GC。这样，一个对象活着的时候地址就不会变，也不会与其它对象重叠，所以用地址来作为identity hash code的实现就很顺手：它甚至都不需要在对象里记录其identity hash code，而只要在每次有请求要获取该值的时候把对象地址返回出去即可。 
（不过这么做的危险之处是用户可能会通过对象hashcode拿到对象地址，以此作为攻击系统的依据） 

即便使用地址来实现hash code，到底是对象创建时的地址还是别的情况又有许多可能性。就算会移动对象的VM也可以使用地址来作为identity hash code，只是得在对象里把第一次记录hash code时的地址值记住，以保证后面再查询时能返回同样的值。CLDC HotSpot Implementation（CLDC-HI）就用了个有趣的做法。可以参考我以前回的一封邮件里提到的论文：http://mail.openjdk.java.net/pipermail/hotspot-compiler-dev/2012-December/009113.html 

但是HotSpot VM默认使用一个伪随机数生成器来实现identity hash code，跟对象地址完全没关系。 
hash code冲突仍然是可能的，毕竟hash code最多就32位，而一个程序总共使用过的对象个数不一定在2^32以下；而且Object.hashCode()/System.identityHashCode()也特别说明允许冲突。 

HotSpot提供了一个VM参数来让用户选择identity hash code的生成方式： 
-XX:hashCode

~~~c++
product(intx, hashCode, 5,                                                \  
        "(Unstable) select hashCode generation algorithm")                \  
~~~

这个参数在JDK7和之前的版本的默认值是0，而从JDK8开始[默认值改为5](http://hg.openjdk.java.net/hsx/hotspot-comp/hotspot/rev/4a916f2ce331)。 
这些值对应的意思是： 

~~~C++
/ hashCode() generation :  
//  
// Possibilities:  
// * MD5Digest of {obj,stwRandom}  
// * CRC32 of {obj,stwRandom} or any linear-feedback shift register function.  
// * A DES- or AES-style SBox[] mechanism  
// * One of the Phi-based schemes, such as:  
//   2654435761 = 2^32 * Phi (golden ratio)  
//   HashCodeValue = ((uintptr_t(obj) >> 3) * 2654435761) ^ GVars.stwRandom ;  
// * A variation of Marsaglia's shift-xor RNG scheme.  
// * (obj ^ stwRandom) is appealing, but can result  
//   in undesirable regularity in the hashCode values of adjacent objects  
//   (objects allocated back-to-back, in particular).  This could potentially  
//   result in hashtable collisions and reduced hashtable efficiency.  
//   There are simple ways to "diffuse" the middle address bits over the  
//   generated hashCode values:  
//  
  
static inline intptr_t get_next_hash(Thread * Self, oop obj) {  
  intptr_t value = 0 ;  
  if (hashCode == 0) {  
     // This form uses an unguarded global Park-Miller RNG,  
     // so it's possible for two threads to race and generate the same RNG.  
     // On MP system we'll have lots of RW access to a global, so the  
     // mechanism induces lots of coherency traffic.  
     value = os::random() ;  
  } else  
  if (hashCode == 1) {  
     // This variation has the property of being stable (idempotent)  
     // between STW operations.  This can be useful in some of the 1-0  
     // synchronization schemes.  
     intptr_t addrBits = intptr_t(obj) >> 3 ;  
     value = addrBits ^ (addrBits >> 5) ^ GVars.stwRandom ;  
  } else  
  if (hashCode == 2) {  
     value = 1 ;            // for sensitivity testing  
  } else  
  if (hashCode == 3) {  
     value = ++GVars.hcSequence ;  
  } else  
  if (hashCode == 4) {  
     value = intptr_t(obj) ;  
  } else {  
     // Marsaglia's xor-shift scheme with thread-specific state  
     // This is probably the best overall implementation -- we'll  
     // likely make this the default in future releases.  
     unsigned t = Self->_hashStateX ;  
     t ^= (t << 11) ;  
     Self->_hashStateX = Self->_hashStateY ;  
     Self->_hashStateY = Self->_hashStateZ ;  
     Self->_hashStateZ = Self->_hashStateW ;  
     unsigned v = Self->_hashStateW ;  
     v = (v ^ (v >> 19)) ^ (t ^ (t >> 8)) ;  
     Self->_hashStateW = v ;  
     value = v ;  
  }  
  
  value &= markOopDesc::hash_mask;  
  if (value == 0) value = 0xBAD ;  
  assert (value != markOopDesc::no_hash, "invariant") ;  
  TEVENT (hashCode: GENERATE) ;  
  return value;  
}  
~~~
~~~text
0 - 使用Park-Miller伪随机数生成器（跟地址无关） 
1 - 使用地址与一个随机数做异或（地址是输入因素的一部分） 
2 - 总是返回常量1作为所有对象的identity hash code（跟地址无关） 
3 - 使用全局的递增数列（跟地址无关） 
4 - 使用对象地址的“当前”地址来作为它的identity hash code（就是当前地址） 
5 - 使用线程局部状态来实现Marsaglia's xor-shift随机数生成（跟地址无关） 
~~~

在HotSpot VM里，Java对象会在首次真正使用到它的identity hash code（例如通过Object.hashCode() / System.identityHashCode()）时调用VM里的函数来计算出值，然后会保存在对象里，后面对同一对象查询其identity hash code时总是会返回最初记录的值。所以前面说“当前”指的是计算identity hash code的时间点，不是对象创建时。 
这组实现代码在HotSpot VM里自从JDK6的早期开发版开始就没变过，只是hashCode选项的默认值变了而已。 

原帖地址：http://hllvm.group.iteye.com/group/topic/39183 ;