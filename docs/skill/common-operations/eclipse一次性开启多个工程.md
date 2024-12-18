---
id: eclipse_launch_multiple_projects
title: eclipse一次性开启多个工程
slug: /common-operations/eclipse_launch_multiple_projects
date: 2017-12-13 09:57:29
authors: laohai
tags: [eclipse,较久远的日志]
keywords: [eclipse]
---

# eclipse一次性开启多个工程
:::info 提示
这是一篇较为久远的文章，其中的知识有可能已经过时
:::


近日有个小需求：因同时制作了多个应用，相互关联。每次启动，都需一个一个的点运行，觉得太麻烦。因此在网上找到了一个插件来解决这个问题。
<!-- truncate -->
需安装“C/C++ Development Tools”,下载地址集合：http://www.eclipse.org/cdt/downloads.php
根据自己的eclipse版本找到对应的cdt版本，本人用的是neon,对应的地址：
http://download.eclipse.org/tools/cdt/releases/9.2

## 安装步骤

### 1.点击 help–>install new Software

work with 栏填写cdt地址
http://download.eclipse.org/tools/cdt/releases/9.2

![这里写图片描述](https://gcore.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404221635387.bmp)

### 2.勾选要安装的插件， 继续N步安装完成后重启eclipse

### 3.重启后menu会有一定的变化。

![img](https://gcore.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404221637441.bmp)

### 4.点击右边原来的绿箭头 Run或者Debug下拉按钮后进入Run Configure.

![img](https://gcore.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404221638662.bmp)

### 5.找到lanugh group

新建一个group ，比如可以命名为 run all.

![img](https://gcore.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404221638127.bmp)

### 6.将自己要一次性同时启动的项目加入进去。保存后下次就可以运行Run all来了。

![img](https://gcore.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404221639613.bmp)

![](https://gcore.jsdelivr.net/gh/haihhhhh/myresource@master/img/202404221639613.bmp)

[查看解决问题的原帖](https://stackoverflow.com/questions/4053265/eclipse-running-multiple-launch-configurations-at-once/11905444)