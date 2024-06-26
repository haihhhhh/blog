---
id: arthas_hot_deployment
title: Arthas热部署及纪要
slug: /maintenance/arthas_hot_deployment
date: 2019-4-29 1：39
authors: laohai
tags: [maintenance,arthas]
keywords: [arthas]
---
当你需要在运行中的 Java 应用程序中进行热部署时，Arthas 是一个强大的工具。它允许你在不重启应用程序的情况下更新代码。下面是使用 Arthas 进行热部署的步骤：

1. **上传代码文件**：首先，将你的 Java 源文件（例如 MathGame.java）上传到服务器上。

2. **启动 Arthas**：运行 `java -jar arthas-boot.jar` 启动 Arthas 服务。

3. **反编译代码**：使用 `jad` 命令反编译 MathGame 类，并将结果输出到 `/tmp/MathGame.java` 文件中：

   `jad --source-only MathGame > /tmp/MathGame.java `

   这个命令可以查看线上运行的代码是否与你想要部署的代码一致。

4. **修改代码**：在 `/tmp/MathGame.java` 文件中添加你需要的更改，例如在打印信息中加入 `"---new"`。

5. **内存编译代码**：使用 `mc` 命令将保存好的 MathGame.java 文件编译成 class 文件（也可以在本地使用 `javac` 命令编译）：

   `mc /tmp/MathGame.java -d /tmp `

6. **重新加载编译好的 class 文件**：使用 `redefine` 命令重新加载编译好的 `.class` 文件：

   `redefine /tmp/MathGame.class `

   现在，你的代码更改已经生效了。

请注意，`redefine` 命令有一些限制：

- 不允许新增字段或方法。
- 正在运行的函数没有退出时，重新加载不会生效。例如，只有 `run` 函数里的更改才会生效。
- 推荐使用 `retransform` 命令，具体原因可参考[这里](https://arthas.aliyun.com/doc/redefine.html)。



#其他的一些例子：
~~~
#监控UpdateJob方法 显示10000次，每10秒中显示1次
monitor -c 10 com.laohai.UpdateJob execute -n 10000

sc -d -f -x:1 com.laohai.SessionManagerBase 

#查看execute方法运行时间大于10毫秒的事件和堆栈
trace -j  com.laohai.UpdateJob|com.laohai.clients.ClientManager execute '#cost > 10'

#查看update方法出参和入参
watch com.laohai.PlayerManager update "{params[0],throwExp}" -x -e 2

~~~
