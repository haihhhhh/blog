---
id: node_problem
title: node_problem 问题解决方法
slug: /ts&js&node/node_problem
date: 2017-8-24 13:49:04
authors: laohai
tags: [log4j,问题解决,较久远的日志]
keywords: [log4j]
---
在尝试导入以下代码时发生错误
~~~typescript
import { readFile, writeFile } from 'node:fs/promises'
~~~
错误信息如下
```
[Urgent] Module build failed: UnhandledSchemeError: Reading from "node:fs/promises" is not handled by plugins (Unhandled scheme)
```
看样子似乎是node:fs/promises的问题,
先尝试安装fs/promises没有解决问题,
后尝试在tsconfig.json中添加
~~~typescript
     "fs": ["node_modules/file-system"],
      "node:fs": ["node_modules/file-system"]
~~~ 
没有解决问题。
最终根据ai提示是webpack的问题，

由于我使用的是nextjs框架，所以需要修改webpack配置文件
在next.config.mjs中添加
~~~typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, { webpack }) => {
      config.experiments = { ...config.experiments, topLevelAwait: true };
      config.externals["node:fs"] = "commonjs node:fs";
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
    };
      config.plugins.push(

        new webpack.NormalModuleReplacementPlugin(
          /^node:/,
          (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          },
        ),
      );
  
      return config;
    }
  }
  
export default nextConfig
~~~
 - [ ] 问题解决
