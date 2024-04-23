---
id: log4j_logger_names
title: log4j的几个常用的logger名称
slug: /common-operations/og4j_logger_names
date: 2017-08-24 13:55:49
authors: laohai
tags: [log4j,较久远的日志]
keywords: [log4j]
---
:::info 提示
这是一篇较为久远的文章，其中的知识有可能已经过时
:::
今天在配置log4j的时候，成功之后打印了一堆其他组件的日志信息。
于是想在业务中配置他们的属性，在网上找到了几个常用的：
~~~properties
#spring
log4j.logger.org.springframework=ERROR
#hibernate
log4j.logger.org.hibernate=ERROR
#jboss
log4j.logger.org.jboss=ERROR
#hikari 一个连接池组件
log4j.logger.com.zaxxer.hikari=ERROR
#netty
log4j.logger.io.netty=ERROR
~~~

输出等级全都设成ERROR，这个世界终于清静了。
