---
id: mysql_common_operations
title: mysql常用操作命令
slug: /common-operations/mysql_common_operations
date: 2020-2-11 11:35:29
authors: laohai
tags: [数据库,mysql]
keywords: [数据库,mysql]
---

# mysql常用操作命令
## 创建用户
~~~mysql
create user 'laohai_subaccount'@'%' identified by 'laohai@2018';  
create user 'laohai_subaccount'@'localhost' identified by 'laohai@2018';  
~~~

## 增加所有权限至新用户
~~~mysql
grant all privileges on *.* to 'laohai_subaccount'@'%'identified by 'laohai@2018' with grant option;

create user 'laohai_subaccount'@'your ip' identified by 'laohai@2019!.';  
grant all privileges on *.* to 'laohai_subaccount'@'your ip'identified by 'laohai@2019!.' with grant option;
~~~

## 收取所有权限至新用户
~~~mysql
revoke all privileges on *.* from 'laohai_subaccount'@'%' ;
~~~

## 用root创建数据库,将数据库的操作权限赋予新用户
~~~mysql
CREATE DATABASE laohai_globaldb DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
grant all privileges on laohai_globaldb.* to 'laohai_subaccount'@'your ip';
flush privileges;  
~~~

## 数据库备份
~~~mysql
mysqldump -ulaohai_subaccount -p  --databases laohai_gamedb> laohai_gamedb.sql; laohai@2019!.
~~~

## 数据库还原
~~~mysql
# 注意：还原只能还原成备份时的数据库名称
mysql -uroot -p195@Myft laohai_gamedb< laohai_gamedb.sql;
~~~

## 修改mysql编码

在/etc/my.cnf下增加如下配置：
~~~shell
[client]
default-character-set=utf8
[mysqld]
character-set-server=utf8
collation-server=utf8_general_ci



log-bin = /usr/local/var/mysql/logs/mysql-bin.log
expire-logs-days = 14
max-binlog-size = 500M
server-id = 1
~~~
