---
id: log4j_WARN_custom_level_class_not_found_solution
title: log4j：WARN custom level class not found问题解决方法
slug: /other/log4j_WARN_custom_level_class_not_found_solution
date: 2017-8-24 13:49:04
authors: laohai
tags: [log4j,问题解决,较久远的日志]
keywords: [log4j]
---
:::info 提示
这是一篇较为久远的文章，其中的知识有可能已经过时
:::
在写一个log4j demo的时候出现了下面的错误：

log4j:WARN custom level class [xxxxx] not found.
出现这个错误，不是log4j的问题，也不是slf4j的问题，问题是因为自己的配置文件有问题。

我的错误配置文件片段如下：
~~~properties
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = logs/log.log
log4j.appender.D.Append = true

输出DEBUG级别以上的日志
log4j.appender.D.Threshold = DEBUG## 输出DEBUG级别以上的日志
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss} [ %t:%r ] - [ %p ] %m%n
~~~
请注意看 log4j.appender.D.Threshold = DEBUG## 输出DEBUG级别以上的日志 这行的配置DEBUG后面有注释，这是导致错误的原因，properties文件的#注释只能出现在行首，不能出现在后面，如果这么配置就会导致log4j找到正确的日志错误级别。