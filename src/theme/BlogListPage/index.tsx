/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BackToTopButton from '@theme/BackToTopButton'
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import styles from './styles.module.scss'
import MyLayout from '../MyLayout'
import Unlisted from '@theme/Unlisted'
import Heading from '@theme/Heading'



function BlogListPageMetadata(props: Props): JSX.Element {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}


// function BlogListPageContent(props: Props): JSX.Element {
//   const {metadata, items, sidebar} = props;
//   return (
//     <BlogLayout sidebar={sidebar}>
//       <BlogPostItems items={items} />
//       <BlogListPaginator metadata={metadata} />
//     </BlogLayout>
//   );
// }
function BlogListPageContent(props: Props) {
const { metadata, items } = props

// const { viewType, toggleViewType } = useViewType()

// const isListView = viewType === 'list'
// const isGridView = viewType === 'grid'

return (
  <MyLayout>
    {/* <h2 className={styles.blogTitle}>
      <Translate id="theme.blog.title.new">博客</Translate>
    </h2>
    <p className={styles.blogDescription}>代码人生：编织技术与生活的博客之旅</p> */}
    {/* <ViewTypeSwitch viewType={viewType} toggleViewType={toggleViewType} /> */}
    <div className="row">
      <div className={'col col--12'}>
        {/* <>
          {isListView && (
            <div className={styles.blogList}>
              <BlogPostItems items={items} />
            </div>
          )}
          {isGridView && <BlogPostGridItems items={items} />}
        </> */}
         <div className={styles.blogList}>
              <BlogPostItems items={items} />
            </div>
        <BlogListPaginator metadata={metadata} />
      </div>
    </div>
    <BackToTopButton />
  </MyLayout>
)
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
