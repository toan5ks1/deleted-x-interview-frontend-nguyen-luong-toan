'use client';

import { ChatHeader, Icon } from '@lobehub/ui';
import { Button, Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import { Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';

import { useGetCategories } from '@/features/categories/use-get-categories';
import { useQuery } from '@/hooks/useQuery';
import { useQueryRoute } from '@/hooks/useQueryRoute';

import { MAX_WIDTH } from '../../../features/const';
import { useScroll } from '../../_layout/Desktop/useScroll';

export const useStyles = createStyles(({ css, token }) => ({
  activeNavItem: css`
    background: ${token.colorFillTertiary};
  `,
  container: css`
    position: absolute;
    z-index: 9;
    inset-block-start: 64px;
    inset-inline: 0 0;

    height: auto;
    padding-block: 4px;

    border-color: transparent;

    transition: all 0.3s ${token.motionEaseInOut};
  `,
  hide: css`
    transform: translateY(-150%);
  `,
  navItem: css`
    font-weight: 500;
  `,
}));

const ALL_CATEGORIES = {
  id: '000',
  name: 'All',
  slug: '/all',
};

const Nav = memo(() => {
  const [hide, setHide] = useState(false);
  const pathname = usePathname();
  const { cx, styles } = useStyles();
  const iconSize = { fontSize: 16 };
  const { q } = useQuery();

  const { data, isLoading } = useGetCategories();

  const router = useQueryRoute();

  useScroll((scroll, delta) => {
    if (delta < 0) {
      setHide(false);
      return;
    }
    if (scroll > 600 && delta > 0) {
      setHide(true);
    }
  });

  const navBar = [ALL_CATEGORIES, ...(data ?? [])]
    .map((item) => {
      const isActive = pathname.includes(item.slug);

      const href = urlJoin('/', item.slug, q ? '/search' : '/');

      return (
        <Link
          href={href}
          key={item.slug}
          onClick={(e) => {
            e.preventDefault();
            router.push(href);
          }}
        >
          <Button
            className={cx(styles.navItem, isActive && styles.activeNavItem)}
            icon={<Icon icon={Bot} size={iconSize} />}
            type={'text'}
          >
            {item.name}
          </Button>
        </Link>
      );
    })
    .filter(Boolean);

  return (
    <ChatHeader
      className={cx(styles.container, isLoading && hide && styles.hide)}
      styles={{
        center: {
          flex: 'none',
          justifyContent: 'space-between',
          maxWidth: MAX_WIDTH,
          width: '100%',
        },
        left: { flex: 1 },
        right: { flex: 1 },
      }}
    >
      <Flexbox align={'center'} gap={4} horizontal>
        {isLoading ? (
          <>
            <Skeleton.Button size={'default'} style={{ height: 24 }} />
            <Skeleton.Button size={'default'} style={{ height: 24 }} />
            <Skeleton.Button size={'default'} style={{ height: 24 }} />
            <Skeleton.Button size={'default'} style={{ height: 24 }} />
            <Skeleton.Button size={'default'} style={{ height: 24 }} />
          </>
        ) : (
          navBar
        )}
      </Flexbox>
    </ChatHeader>
  );
});

export default Nav;
