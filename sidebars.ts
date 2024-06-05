import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  skill: [
    'skill/skill_introduction',
    {
      label: '常规操作',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'skill/common-operations/git-common-operations',
        'skill/common-operations/fork-project-code-version-management',
        'skill/common-operations/vscode_keyboard_shortcut',
        'skill/common-operations/centos7_common_operations',
        'skill/common-operations/eclipse_launch_multiple_projects',
        'skill/common-operations/mysql_common_operations',
        'skill/common-operations/nginx_common_operations',
        'skill/common-operations/log4j_logger_names'
      ],
    },
    {
      label: '数据库',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'skill/database/mysql_zip_log',
      ],
    },
    {
      label: 'jvm',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'skill/jvm/jvm_set_hashcode',
      ],
    },
    {
      label: '运维',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'skill/maintenance/maintenance_skill_about_security',
      ],
    },
    {
      label: '网络',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'skill/network/tcp_udp_difference',
      ],
    },
    {
      label: '编程语言',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        {
          label: 'java',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'skill/programming_language/java/javacode_mem',
          ],
        }
      ],
    },
    {
      label: 'office',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'skill/office/openoffice_study_category_chapter_1',
      ],
    },
    // {
    //   label: '其他',
    //   type: 'category',
    //   link: { type: 'generated-index' },
    //   items: [
    //     'skill/other/log4j_WARN_custom_level_class_not_found_solution',
    //   ],
    // },


    
   
    // {
    //   label: '常用操作',
    //   type: 'category',
    //   link: {
    //     type: 'doc',
    //     id: 'skill/common-operations/docusaurus-guides',
    //   },
    //   items: [
    //     'skill/docusaurus/docusaurus-deploy',
    //   ],
    // },
    // {
    //   label: 'Web',
    //   type: 'category',
    //   link: { type: 'generated-index' },
    //   items: [
    //     {
    //       label: 'Vue',
    //       type: 'category',
    //       link: { type: 'generated-index' },
    //       items: [
    //         'skill/web/vue/vue-reactive-data-object',
    //         'skill/web/vue/vue-reactive-data-array',
    //         'skill/web/vue/vue-reactive-data-basic-type',
    //         'skill/web/vue/pinia',
    //       ],
    //     },
    //     {
    //       label: 'React',
    //       type: 'category',
    //       link: { type: 'generated-index' },
    //       items: [
    //         {
    //           type: 'autogenerated',
    //           dirName: 'skill/web/react',
    //         },
    //       ],
    //     }
    //   ],
    // },
   
  ],
  solution: [
    'solution/solution_introduction',
    {
      label: 'ts&js&node',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'solution/ts&js&node/node_problem',
      ],
    },
    {
      label: 'java',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'solution/java/log4j_WARN_custom_level_class_not_found_solution',
      ],
    },
    
  ]
}

module.exports = sidebars
