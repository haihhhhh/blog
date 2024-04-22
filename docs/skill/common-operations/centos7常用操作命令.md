---
id: centos7_common_operations
title: centos7常用操作命令
slug: /common-operations/centos7_common_operations
date: 2020-2-11 11:35:29
authors: laohai
tags: [centos7,linux]
keywords: [centos7]
---
# centos7常用操作命令
## 查看防火墙是否运行
~~~shell 
firewall-cmd --state
~~~
### 启动：
~~~shell
systemctl start firewalld
~~~
### 关闭：
~~~shell 
systemctl stop firewalld
~~~
### 查看状态： 
~~~shell 
systemctl status firewalld 
~~~
### 开机禁用  ： 
~~~shell 
systemctl disable firewalld
~~~
### 开机启用  ： 
~~~shell 
systemctl enable firewalld
~~~
### 查看已经增加的信任
~~~shell
firewall-cmd --list-port
firewall-cmd --list-all
~~~
### 信任
~~~shell
firewall-cmd --permanent --zone=public --add-port=9151/tcp
firewall-cmd --permanent --zone=public --add-port=30000-50000/udp
firewall-cmd --permanent --zone=public --add-rich-rule 'rule family="ipv4" source address="开放的ip" port protocol="tcp" port="3309" accept'
~~~

### 打开端口限制ip
~~~shell
firewall-cmd --permanent --zone=public --add-rich-rule 'rule family="ipv4" source address="192.168.1.24" port protocol="tcp" port="3309" accept'
firewall-cmd --reload
~~~

### 移除信任：
~~~shell
firewall-cmd --permanent --zone=public --remove-port=12345/tcp

firewall-cmd --permanent --zone=public --remove-rich-rule 'rule family="ipv4" source address="远程ip" port protocol="tcp" port="8840" accept'
firewall-cmd --reload
~~~


## 修改时区至首尔
~~~shell
vi /etc/sysconfig/clock
ZONE="Asia/Seoul"
UTC=false
ARC=false

ln -sf /usr/share/zoneinfo/Asia/Seoul    /etc/localtime
/sbin/hwclock --systohc
ntpdate cn.pool.ntp.org
~~~

## 远程拷贝文件
~~~shell
scp -P [port] /home/source.jar user@remotehost:/home/target.jar
~~~

## 远程登录
~~~shell
ssh -p [port] user@remotehost
~~~

## 查找日志
~~~shell
find /home/Logs/ -name '*.log' |xargs grep 'keyword'
~~~









