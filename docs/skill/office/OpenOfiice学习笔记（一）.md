---
id: openoffice_study_category_chapter_1
title: OpenOfiice学习笔记（一）
slug: /office/openoffice_study_category_chapter_1
date: 2014-11-3 00:37:04
authors: laohai
tags: [office,openoffice,较久远的日志]
keywords: [openoffice]
---
<font color="gray">! 这是一篇较为久远的文章，其中的知识有可能已经过时</font><br/>
近日因为业务需要，需要做一些文档的处理功能：office转pdf,试了好些开源的东西效果都很不靠谱，先是尝试了下poi，结果转出来的效果看起来惨不忍睹，后得知这东西早都不维护了。后来百度了一下，尝试了一下OpenOffice.org这个开源的东西，感觉这个还是比较成熟和靠谱的，也有成熟的开源社区什么的。OpenOffice是一款跨平台的套件，是Apache的东西，说起来东西太多有点复杂，简单的说就是一个类似与微软office的文档处理工具，有成熟的sdk供开发者使用和扩展。

由于工作忙，时间紧，研究的也是断断续续的，现将最近的研究心得记录下来，以备存档（主要是记录下自己遇到的坑）。
## 一.安装

![img](https://fastly.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404230018905.jpeg)

首先安装openOffice,下载安装包运行执行到这一步

![img](https://fastly.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404230018557.jpeg)

可以看到可以选择要安装的东西，这里其实类似与office的安装，简单的说Writer就是word,
Calc就是excel,impress就是ppt。
点击下一步安装成功即可。

接着我们要继续安装sdk

![img](https://fastly.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404230021665.jpeg)

安装解压成功后可以在sdk包里找到文档和例子。支持java,c++,还有别的什么语言。
将jar包拷到自己的项目lib下就可以用了。
这里有个很蛋疼的事情，参照网上写的攻略我在sdk中怎么也找不到jar包，后来才发现jar都在OpenOffice的安装目录里，并不在sdk里面。也不知道他们是怎么个想法。
![img](https://fastly.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404230022586.jpeg)

网上有专门的文章说什么功能对应什么jar包的，我也懒得看了，都一并拷过来放在lib目录下就可以测试开发了。

## 二．Word转pdf

说实在的，我到现在都感觉openOffice这个东西好高端复杂，里面光api都好多全英文看的头晕。
比较实用也能简单入手的就是这个功能：word转pdf.
主要是使用java调用openOffice系统命令,使用一个叫做DocumentConvertor的对象来对word文件进行转换。
这里我只是参考了网上的代码，进行了基本的配置和转换代码。
把代码贴出来：



~~~java
package com.lemon.office.open_office；
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.ConnectException;
import java.util.Properties；
import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;
public class Office2PDFUtil {
    private String sPort;
    private String sOpenOfficeHome;
    private String sHost;
    // public static void main(String[] args) {
    // Office2PDFUtil o=new Office2PDFUtil();
    // o.office2PDF(“C:\Users\app\Desktop\1.doc”, “C:\Users\app\Desktop\1.pdf”);
    // }
    public boolean office2PDF(String sourceFile, String destFile) {
        try {
            File inputFile = new File(sourceFile);
            if (!inputFile.exists()) {
                return false; // 找不到源文件, 则返回false
            }
            // 如果目标路径不存在, 则新建该路径
            File outputFile = new File(destFile);
            if (!outputFile.getParentFile().exists()) {
                outputFile.getParentFile().mkdirs();
            }
            Properties p = new Properties();
            InputStream in = getClass().getResourceAsStream(“service.properties”);
            p.load( in ); in .close();
            this.sOpenOfficeHome = p.getProperty(“openoffice_home”);
            this.sHost = p.getProperty(“host”);
            this.sPort = p.getProperty(“port”);
            if (sOpenOfficeHome.length() == 0) {
                sOpenOfficeHome = ”C: \Program Files\ OpenOffice 4\”;
            }
            // 如果从文件中读取的URL地址最后一个字符不是 ‘\’，则添加’\’
            if (sOpenOfficeHome.charAt(sOpenOfficeHome.length() - 1) != ‘\’) {
                sOpenOfficeHome += “\”;
            }
            if (sHost.length() == 0) {
                sHost = ”127.0.0.1”;
            }
            if (sPort.length() == 0) {
                sPort = ”8100”;
            }
            // 启动OpenOffice的服务
            String command = sOpenOfficeHome + “program\ soffice.exe - headless - accept = \”socket, host = ”+sHost + ”, port = ”+sPort + ”;
            urp;\” - nofirststartwizard”;
            Process pro = Runtime.getRuntime().exec(command);
            // connect to an OpenOffice.org instance running on port 8100
            OpenOfficeConnection connection = new SocketOpenOfficeConnection(
                sHost, Integer.parseInt(sPort));
            connection.connect();
            // convert
            DocumentConverter converter = new OpenOfficeDocumentConverter(
                connection);
            converter.convert(inputFile, outputFile);
            // close the connection
            connection.disconnect();
            // 关闭OpenOffice服务的进程
            pro.destroy();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return false;
        } catch (ConnectException e) {
            e.printStackTrace();
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}

~~~

经测试，转出来的效果基本还是符合要求的，word,ppt,excel都可以转成pdf,但是不知道为什么有的文档转换过程中会报错，这个问题正在研究中。

## 三．简单封装。

我们使用openOffice的目的肯定不会是简单的使用个转换工具，如果可以通过代码来控制并生成word和 excel和ppt文件那肯定是极好的。
经过我这几天的研究，发现他的api考虑的实在是太多了，也可能是我太低端了，不明白他为什么要把这个东西搞的这么复杂，光一个writer我就快吐血了。各种各样的密密麻麻的对象种类，各种对象还有依赖关系，想插入一个简单的文字就要用好多个对象。
据我了解，就说实现在一个word文件中打印一行字需要如下几个步骤：
### 1.根据软件安装路径获取openOfficeHome，进一步获取上下文对象XComponentContext
### 2.获取文档对象：XTextDocument
在这个过程依次需要获取加载对象XComponentLoader、组件对象XComponent
多组件工厂对象 XMultiComponentFactory、桌面对象oDesktop还有一系列的参数，以及你文字的样式对象PropertyValue。最后终于获取了文本XTextDocument.
### 3.依次获取:
存储对象XStorable、文本对象中的文本xText（也是个对象，吐血），文本游标XTextCursor，服务工厂XMultiServiceFactory，参数集合对象XPropertySet，最后调用xText的insertString方法。
### 4.保存：
保存时也不让人省心，保存文件路径还要加上固定的前缀：file:///，这点坑了我好久。
最后调用xStorable对象的storeAsURL方法，总算保存成功了，一个helloword总算出现在文本里了 。
以上说的只是保存一个简单的文字，其他的还要保存表格、图片、下划线、乱七八糟的符号，这个用法肯定不行，肯定要再封装。我现在还没完全弄好，初步想法是将word中的各种东西，纯文本也好，表格也好，都弄成一个WordContent的子类，实现的效果就是想保存什么直接new这个对象，然后统一调用Save方法，Save方法只接收WordContent以及子类的单个或List对象。但这里面还有很多问题，待下次研究明白了再继续写。

