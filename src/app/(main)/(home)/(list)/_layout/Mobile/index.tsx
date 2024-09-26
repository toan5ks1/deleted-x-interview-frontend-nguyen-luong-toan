import { PropsWithChildren } from 'react';

import Footer from '@/components/Setting/Footer';
import MobileContentLayout from '@/components/server/MobileNavLayout';

import { SCROLL_PARENT_ID } from '../../../features/const';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <MobileContentLayout
      gap={16}
      header={<Header />}
      id={SCROLL_PARENT_ID}
      style={{ paddingInline: 16, paddingTop: 8 }}
      withNav
    >
      {children}
      <div />
      <Footer />
    </MobileContentLayout>
  );
};

Layout.displayName = 'MobileDiscoverLayout';

export default Layout;
