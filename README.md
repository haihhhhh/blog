<h2 align="center">
<a href="https://www.laohaicode.com" rel="nofollow">星海听雨</a>
</h2>
<p align="center">


## 👋 介绍

- [老海的个人博客](https://www.laohaicode.com) 专用模板，分享自己的所思所想。
  
- 基于 [Docusaurus](https://docusaurus.io/) 搭建。
  
- Forked from [愧怍](https://github.com/kuizuo/blog)


## ✨ 特性

- 🦖 **Docusaurus** - 基于 Docusaurus，提供强大的文档生成和博客功能
- ✍️ **Markdown** - 写作方便，Markdown
- 🎨 **Beautiful** - 整洁，美观，阅读体验优先
- 🌐 **i18n** - 支持国际化
- 💯 **SEO** - 搜索引擎优化，易于收录
- 📊 **数据分析** - 支持 baidu统计和VercelAnalytics
<!-- - 🔎 **全文搜索** - 支持 [Algolia DocSearch](https://github.com/algolia/docsearch) -->
- 🚀 **持续集成** - 支持 CI/CD，自动部署更新内容
- 🏞️ **首页视图** - 显示最新博客文章、项目展示，个人特点，技术栈等
- 📦 **项目展示** - 展示你的项目，可用作于作品集


## 📊 目录结构

```bash
├── blog                           # 博客
│   ├── first-blog.md
├── data
│   ├── feature.tsx                # 特点
│   ├── projects.tsx               # 项目
│   ├── skills.tsx                 # 技术栈
│   └── social.ts                  # 社交链接
├── docs                           # 文档/笔记
│   └── doc.md
├── i18n                           # 国际化
├── src
│   ├── components                 # 组件
│   ├── css                        # 自定义CSS
│   ├── pages                      # 自定义页面
│   ├── plugin                     # 自定义插件
│   └── theme                      # 自定义主题组件
│   └── utils                      # 工具
├── static                         # 静态资源文件
│   └── img                        # 静态图片
│   └── svg                        # svg图片
├── docusaurus.config.ts           # 站点的配置信息
├── sidebars.ts                    # 文档的侧边栏
├── package.json
├── tsconfig.json
└── yarn-lock.yaml
```

## 📥 运行

```bash
git clone https://github.com/haihhhhh/blog.git
cd blog
yarn install
yarn start
```

构建

```bash
yarn build
```

## 📷 截图

<img width="1471" alt="Live Demo" src="https://github.com/haihhhhh/blog/blob/main/static/img/project/blog.png?raw=true">

## 📝 许可证

[MIT](./LICENSE)