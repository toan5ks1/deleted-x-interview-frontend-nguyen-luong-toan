'use client';

import { ChatHeader, Icon } from '@lobehub/ui';
import { Button, Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import { Bot } from 'lucide-react';
import Link from 'next/link';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';

import { useScroll } from '../../(products)/features/useScroll';
import { MAX_WIDTH } from '../../../features/const';
import { useNav } from '../../../features/useNav';

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

const Nav = memo(() => {
  const [hide, setHide] = useState(false);
  const { cx, styles } = useStyles();
  const { activeItem, navItems, isLoading } = useNav();

  useScroll((scroll, delta) => {
    if (delta < 0) {
      setHide(false);
      return;
    }
    if (scroll > 600 && delta > 0) {
      setHide(true);
    }
  });

  return (
    <ChatHeader
      className={cx(styles.container, hide && styles.hide)}
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
            <Skeleton.Button key={'001'} size={'large'} style={{ height: 24 }} />
            <Skeleton.Button key={'002'} size={'large'} style={{ height: 24 }} />
            <Skeleton.Button key={'003'} size={'large'} style={{ height: 24 }} />
            <Skeleton.Button key={'004'} size={'large'} style={{ height: 24 }} />
            <Skeleton.Button key={'005'} size={'large'} style={{ height: 24 }} />
            <Skeleton.Button key={'006'} size={'large'} style={{ height: 24 }} />
          </>
        ) : (
          navItems.map((item) => (
            <Link href={urlJoin('/', item.key)} key={item.key}>
              <Button
                className={cx(styles.navItem, activeItem.slug === item.key && styles.activeNavItem)}
                icon={<Icon icon={Bot} size={{ fontSize: 16 }} />}
                type={'text'}
              >
                {item.label}
              </Button>
            </Link>
          ))
        )}
      </Flexbox>
    </ChatHeader>
  );
});

export default Nav;
