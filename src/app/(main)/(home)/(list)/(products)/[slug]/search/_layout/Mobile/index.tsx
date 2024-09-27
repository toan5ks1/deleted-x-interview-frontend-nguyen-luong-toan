import { PropsWithChildren } from 'react';

import { SCROLL_PARENT_ID } from '@/app/(main)/(home)/features/const';
import Footer from '@/components/Setting/Footer';
import MobileContentLayout from '@/components/server/MobileNavLayout';

import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <MobileContentLayout
      gap={16}
      header={<Header />}
      id={SCROLL_PARENT_ID}
      style={{ paddingInline: 16 }}
    >
      {children}
      <div />
      <Footer />
    </MobileContentLayout>
  );
};

Layout.displayName = 'MobileDiscoverSearchLayout';

export default Layout;
