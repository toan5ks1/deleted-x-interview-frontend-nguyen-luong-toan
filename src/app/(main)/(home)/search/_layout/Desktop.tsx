import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

import Footer from '@/components/Setting/Footer';

import Nav from '../../(list)/(products)/features/Nav';
import { MAX_WIDTH, SCROLL_PARENT_ID } from '../../features/const';

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <Flexbox
      align={'center'}
      flex={1}
      id={SCROLL_PARENT_ID}
      padding={16}
      style={{ overflowX: 'hidden', overflowY: 'scroll', position: 'relative' }}
      width={'100%'}
    >
      <Nav />
      <Flexbox gap={16} style={{ maxWidth: MAX_WIDTH, position: 'relative' }} width={'100%'}>
        <Flexbox gap={24} horizontal style={{ position: 'relative' }} width={'100%'}>
          <Flexbox flex={1} gap={16}>
            {children}
          </Flexbox>
        </Flexbox>
        <div />
        <Footer />
      </Flexbox>
    </Flexbox>
  );
};

Layout.displayName = 'DesktopDiscoverSearchLayout';

export default Layout;
