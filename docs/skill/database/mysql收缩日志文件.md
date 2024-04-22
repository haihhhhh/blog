---
id: mysql_zip_log
title: mysql收缩日志文件
slug: /database/mysql_zip_log
date: 2016-3-1 16:34:00
authors: laohai
tags: [数据库,mysql]
keywords: [数据库,mysql]
---

# mysql收缩日志文件

~~~mysql
USE 数据库名称; 
GO
ALTER DATABASE 数据库名称  SET RECOVERY SIMPLE;  
--设置简单恢复模式   
GO
DBCC SHRINKFILE (数据库日志文件逻辑名称, 1);  
--压缩日志文件为1Mb 
GO
ALTER DATABASE 数据库名称  SET RECOVERY FULL;  
--恢复为原模式   
GO 
~~~