import { Icon } from '@lobehub/ui';
import { Button, Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import { Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import urlJoin from 'url-join';

import { CategoriesType, useGetCategories } from '@/features/categories/use-get-categories';

export const ALL_CATEGORIES = {
  id: '000',
  name: 'All',
  slug: '/all',
};

export const NO_CATEGORY = {
  id: '',
  name: '',
  slug: '',
};

export const useStyles = createStyles(({ css, token }) => ({
  activeNavItem: css`
    background: ${token.colorFillTertiary};
  `,
  navItem: css`
    font-weight: 500;
  `,
}));

export const useNav = (isMobile?: boolean) => {
  const pathname = usePathname();
  const { cx, styles } = useStyles();

  const { data, isLoading } = useGetCategories();
  const items = [ALL_CATEGORIES, ...(data ?? [])];

  const renderNavItems = useCallback((items: CategoriesType['data']) => {
    return isMobile
      ? items.map((item) => {
          return {
            icon: <Icon icon={Bot} size={{ fontSize: 16 }} />,
            key: item.slug,
            label: item.name,
          };
        })
      : items.map((item) => {
          return (
            <Link href={urlJoin('/', item.slug)} key={item.slug}>
              <Button
                className={cx(styles.navItem, pathname.includes(item.slug) && styles.activeNavItem)}
                icon={<Icon icon={Bot} size={{ fontSize: 16 }} />}
                type={'text'}
              >
                {item.name}
              </Button>
            </Link>
          );
        });
  }, []);

  const navItems = useMemo(() => {
    return isLoading
      ? [
          <Skeleton.Button key={'001'} size={'large'} style={{ height: 24 }} />,
          <Skeleton.Button key={'002'} size={'large'} style={{ height: 24 }} />,
          <Skeleton.Button key={'003'} size={'large'} style={{ height: 24 }} />,
          <Skeleton.Button key={'004'} size={'large'} style={{ height: 24 }} />,
          <Skeleton.Button key={'005'} size={'large'} style={{ height: 24 }} />,
        ]
      : renderNavItems(items);
  }, [isLoading]);

  const activeItem = useMemo(() => {
    return items.find((item) => pathname.includes(item.slug)) ?? NO_CATEGORY;
  }, [pathname]);

  return {
    activeItem,
    navItems,
  };
};
