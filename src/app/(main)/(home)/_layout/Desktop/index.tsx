import { PropsWithChildren } from 'react';

import NProgress from '@/components/NProgress';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NProgress />

      {children}
      {/* ↓ cloud slot ↓ */}

      {/* ↑ cloud slot ↑ */}
    </>
  );
};

Layout.displayName = 'DesktopDiscoverStoreLayout';

export default Layout;
