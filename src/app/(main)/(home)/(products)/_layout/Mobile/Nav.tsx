'use client';

import { ActionIcon } from '@lobehub/ui';
import { Drawer } from 'antd';
import { createStyles } from 'antd-style';
import { MenuIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';

import Menu, { MenuProps } from '@/components/Menu';
import { useQueryRoute } from '@/hooks/useQueryRoute';

import { useNav } from '../../../features/useNav';

export const useStyles = createStyles(({ css, token }) => ({
  activeNavItem: css`
    background: ${token.colorFillTertiary};
  `,
  container: css`
    height: auto;
    padding-block: 4px;
    background: ${token.colorBgLayout};
  `,
  navItem: css`
    font-weight: 500;
  `,
  title: css`
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
}));

const Nav = memo(() => {
  const [open, setOpen] = useState(false);
  const { styles, theme } = useStyles();
  const { navItems, activeItem } = useNav();
  const router = useQueryRoute();

  return (
    <>
      <Flexbox align={'center'} className={styles.title} gap={4} horizontal width={'100%'}>
        <ActionIcon
          color={theme.colorText}
          icon={MenuIcon}
          onClick={() => setOpen(true)}
          size={{ blockSize: 32, fontSize: 18 }}
        />
        {activeItem?.name}
      </Flexbox>

      <Drawer
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          justifyContent: 'space-between',
          padding: 16,
        }}
        headerStyle={{ display: 'none' }}
        onClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        open={open}
        placement={'left'}
        rootStyle={{ position: 'absolute' }}
        style={{
          background: theme.colorBgLayout,
          borderRight: `1px solid ${theme.colorSplit}`,
          paddingTop: 44,
        }}
        width={260}
        zIndex={10}
      >
        <Menu
          items={navItems as MenuProps['items']}
          onClick={({ key }) => {
            if (key === 'all') {
              router.push('/');
            } else {
              router.push(urlJoin('/', key));
            }
          }}
          selectable
          selectedKeys={[activeItem.slug]}
          variant={'compact'}
        />
      </Drawer>
    </>
  );
});

export default Nav;
