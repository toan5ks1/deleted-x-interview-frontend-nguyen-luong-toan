'use client';

import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { LayoutProps } from './type';

const Layout = memo<LayoutProps>(({ children, nav }) => {
  return (
    <Flexbox
      height={'100%'}
      horizontal
      style={{
        position: 'relative',
      }}
      width={'100%'}
    >
      {nav}
      {children}
    </Flexbox>
  );
});

Layout.displayName = 'DesktopMainLayout';

export default Layout;
