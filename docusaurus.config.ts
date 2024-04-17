import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import social from "./data/social";
const beian = ""; //'闽ICP备11111'
const beian1 = ""; //'闽公网安备111'
const config: Config = {
  title: "老海的世界",
  tagline: "",
  favicon: "img/favicon.ico",
  url: "https://laohai.com",
  baseUrl: "/",
  organizationName: "laohai", // Usually your GitHub org/user name.
  projectName: "tinghai_blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  themeConfig: {
    // Replace with your project's social card
    //image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "",
      logo: {
        alt: "老海",
        src: "img/logo.webp",
        srcDark: "img/logo.webp",
      },
      items: [
        {
          label: "博客",
          position: "right",
          to: "blog",
        },
        {
          label: "项目",
          position: "right",
          to: "project",
        },
        {
          label: "笔记",
          position: "right",
          to: "docs/skill",
        },
        // {
        //   label: '更多',
        //   position: 'right',
        //   items: [
        //     { label: '归档', to: 'blog/archive' },
        //     { label: '笔记', to: 'docs/skill' },
        //     { label: '资源', to: 'resources' },
        //     { label: '友链', to: 'friends' },
        //     { label: '工具推荐', to: 'docs/tools' },
        //   ],
        // },
        // {
        //   type: "localeDropdown",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "学习",
          items: [
            { label: "博客", to: "blog" },
            // { label: "归档", to: "blog/archive" },
            // { label: "技术笔记", to: "docs/skill" },
            // { label: "实战项目", to: "project" },
          ],
        },
        {
          title: "社交媒体",
          items: [
            { label: "关于我", to: "/about" },
            { label: "GitHub", href: social.github.href },
            // { label: "Twitter", href: social.twitter.href },
            // { label: "掘金", href: social.juejin.href },
            // { label: "Discord", href: social.discord.href },
          ],
        },
        {
          title: "更多",
          items: [
            { label: "友链", position: "right", to: "friends" },
            // { label: "导航", position: "right", to: "resources" },
            {
              html: `
                <a href="https://docusaurus.io/zh-CN/" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                <a/>
                `,
            },
          ],
        },
      ],
      copyright: `
        <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
        <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${
          beian1.match(/\d+/)?.[0]
        }" >${beian1}</a></p>
        <p>Copyright © 2024 - PRESENT 老海 Built with Docusaurus.</p>
        `,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
    // prism: {
    //   theme: prismThemes.github,
    //   darkTheme: prismThemes.dracula,
    // },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        // blog: {
        //   showReadingTime: true,
        //   routeBasePath: '/', // Serve the blog at the site's root
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: false,
        theme: {
          customCss: "./src/css/custom.scss",
        },
        debug: process.env.NODE_ENV === "development",
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    "docusaurus-plugin-image-zoom",
    "docusaurus-plugin-sass",
    "@docusaurus/plugin-ideal-image",
    // ['docusaurus-plugin-baidu-tongji', { token: 'c9a3849aa75f9c4a4e65f846cd1a5155' }],
    // [
    //   '@docusaurus/plugin-pwa',
    //   {
    //     debug: process.env.NODE_ENV === 'development',
    //     offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
    //     pwaHead: [
    //       { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
    //       { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
    //       { tagName: 'meta', name: 'theme-color', content: '#12affa' },
    //     ],
    //   },
    // ],
    [
      "./src/plugin/plugin-content-blog", // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: "blog",
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/haihhhhh/blog/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: "老海的博客",
        blogSidebarCount: 10,
        blogSidebarTitle: "最近的博客",
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: "all",
          title: "老海",
          copyright: `Copyright © ${new Date().getFullYear()} 老海 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
        },
      },
    ],
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
};

export default config;
