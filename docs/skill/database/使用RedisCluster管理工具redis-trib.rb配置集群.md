---
id: redis_cluster_redis-trib.rb
title: 使用RedisCluster管理工具redis-trib.rb配置集群
slug: /database/redis_cluster_redis-trib.rb
date: 2018-3-1 16:34:00
authors: laohai
tags: [数据库,redis]
keywords: [数据库,redis]
---

## 使用RedisCluster管理工具redis-trib.rb配置集群

### 查看帮助

~~~
ruby redis-trib.rb help
~~~



~~~shell
Usage: redis-trib <command> <options> <arguments ...>

  create          host1:port1 ... hostN:portN
                  --replicas <arg>
  check           host:port
  info            host:port
  fix             host:port
                  --timeout <arg>
  reshard         host:port
                  --from <arg>
                  --to <arg>
                  --slots <arg>
                  --yes
                  --timeout <arg>
                  --pipeline <arg>
  rebalance       host:port
                  --weight <arg>
                  --auto-weights
                  --threshold <arg>
                  --use-empty-masters
                  --timeout <arg>
                  --simulate
                  --pipeline <arg>
  add-node        new_host:new_port existing_host:existing_port
                  --slave
                  --master-id <arg>
  del-node        host:port node_id
  set-timeout     host:port milliseconds
  call            host:port command arg arg .. arg
  import          host:port
                  --from <arg>
                  --copy
                  --replace
~~~



### 命令参看

~~~shell
1、create：创建集群
2、check：检查集群
3、info：查看集群信息
4、fix：修复集群
5、reshard：在线迁移slot
6、rebalance：平衡集群节点slot数量
7、add-node：将新节点加入集群
8、del-node：从集群中删除节点
9、set-timeout：设置集群节点间心跳连接的超时时间
10、call：在集群全部节点上执行命令
11、import：将外部redis数据导入集群
~~~

### 创建集群，要求数据库全空
~~~shell
./redis-trib.rb  create --replicas  1  10.0.0.62:7001  10.0.0.62:7002  10.0.0.62:7003  10.0.0.62:7004  10.0.0.62:7005  10.0.0.62:7006
~~~



### 检查集群，设置

~~~
./redis-trib.rb check 10.0.0.62:7001
~~~



检查前会先执行load_cluster_info_from_node方法，把所有节点数据load进来。load的方式为通过自己的cluster nodes发现其他节点，然后连接每个节点，并加入nodes数组。接着生成节点间的复制关系。

参看[这里](https://blog.csdn.net/huwei2003/article/details/50973967)