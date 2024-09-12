---
id: debian11_docker_install
title: Debian 11 上安装最新版本的 containerd.io、Docker 和 Docker Compose
slug: /common-operations/debian11_docker_install
date: 2024-9-12 15:00:00
authors: laohai
tags: [docker]
keywords: [docker]
---
1. **更新 apt 包索引**：

   ~~~shell
   sudo apt update 
   ~~~

   

2. **安装必要的包**：

   ~~~shell
   sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
   ~~~

   

3. **添加 Docker 的官方 GPG 密钥**：

   ~~~shell
   curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg 
   ~~~

   

4. **设置阿里云的 Docker 仓库**：

   ~~~shell
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null 
   ~~~

   

5. **更新 apt 包索引**：

   ~~~shell
   sudo apt update 
   ~~~

   

6. **安装 Docker 引擎、containerd.io 和 Docker Compose 插件**：

   ~~~shell
   sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ~~~

   

7. **启动并启用 Docker 服务**：

   ~~~shell
   sudo systemctl start docker sudo systemctl enable docker 
   ~~~

8. **验证 Docker 安装**：

   ~~~shell
   sudo docker run hello-world
   ~~~

   

9. **添加当前用户到 Docker 组**（这样你就不需要每次都使用 `sudo` 来运行 Docker 命令）：

   ~~~shell
   sudo usermod -aG docker $USER # 重新登录以应用组更改 
   ~~~

   

10. **下载并安装最新版本的 Docker Compose**：

    ~~~shell
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    ~~~

    

11. 其他相关命令:

    以应用名为app-server为例

    **构建镜像（不用缓存）**

    ~~~shell
    docker-compose build  app-server --no-cache  
    ~~~

    

    **启动镜像（静默启动）**

    ~~~shell
    docker-compose up -d
    ~~~

    **进入镜像**

    ~~~shell
    docker exec -it app-server /bin/bash
    ~~~

    

    **退出镜像且不关闭镜像内应用**

    ~~~shell
    Ctrl+P+Q
    ~~~

    

    **查看镜像内日志**

    ~~~shell
    docker-compose logs -f app-server
    ~~~

    **给docker添加镜像源代理**

    ~~~shell
    sudo tee /etc/docker/daemon.json <<-'EOF'
    {
      "registry-mirrors": ["https://doublezonline.cloud"]
    }
    EOF
    
    ~~~

    

    

​                 

​              