import React, { useState }  from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useVisibleBlogSidebarItems} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/BlogSidebar/Desktop';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import { Icon } from '@iconify/react'
import styles from './styles.module.scss';

export default function BlogSidebarDesktop({sidebar}: Props): JSX.Element {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const { isBlogPostPage } = useBlogPost();
  const [isHovered, setIsHovered] = useState(false);
  const handleBack = () => {
    window.history.back()
  }
  return (
    <aside className="col col--2"  
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <nav
        className={clsx(styles.sidebar, 'thin-scrollbar')}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}
        style={{ opacity: isHovered ? 1 : 0 }}
        >
            {isBlogPostPage && (
          <div className={styles.backButton} onClick={handleBack}>
            <Icon icon="ri:arrow-go-back-line"></Icon>
          </div>
        )}
        <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
          {sidebar.title}
        </div>
        <ul className={clsx(styles.sidebarItemList, 'clean-list')}>
          {items.map((item) => (
            <li key={item.permalink} className={styles.sidebarItem}>
              <Link
                isNavLink
                to={item.permalink}
                className={styles.sidebarItemLink}
                activeClassName={styles.sidebarItemLinkActive}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
