import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import Translate, { translate } from '@docusaurus/Translate'

export type FeatureItem = {
  title: string
  text: JSX.Element
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: 'TypeScript 全栈工程师',
    }),
    text: (
      <Translate>
       TypeScript 全栈工程师
      </Translate>
    ),
    Svg: WebDeveloperSvg,
  },
 
]

export default FEATURES
