export const projects: Project[] = [
  {
    title: '老海的个人主页',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://laohaicode.com',
    source: 'https://github.com/haihhhhh/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: '管理系统模板(单体版)',
    description: '🦖 基于 Ruoyi 单体版管理系统模板,校园管理业务(demo)',
    preview: '/img/project/campus.png',
    website: '',
    source: 'https://github.com/haihhhhh/campus_manage',
    tags: ['opensource', 'design', ],
    type: 'web',
  },
  {
    title: '管理系统后台(Vue)',
    description: '🦖 基于 vben 的后台系统，可与laohai_admin_api配对使用',
    preview: '/img/project/laohai_admin_vue.png',
    website: '',
    source: 'https://github.com/haihhhhh/laohai-admin-vue',
    tags: ['opensource', 'design', ],
    type: 'web',
  },
  {
    title: '管理系统后台API',
    description: '🦖 基于 react 、nestjs、swagger 的管理系统API，可与laohai_admin_vue配对使用',
    preview: '/img/project/laohai_admin_api.png',
    website: '',
    source: 'https://github.com/haihhhhh/laohai_admin_api',
    tags: ['opensource', 'design', ],
    type: 'web',
  },
 
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

export const projectTypeMap = {
  web: '网站',
  app: '应用',
  commerce: '商业项目',
  personal: '个人',
  toy: '玩具',
  other: '其他',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
