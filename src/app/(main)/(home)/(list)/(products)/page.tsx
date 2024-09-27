import { Flexbox } from 'react-layout-kit';

import StructuredData from '@/components/StructuredData';
import { Locales } from '@/locales/resources';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { DiscoverService } from '@/server/services/discover';
import { translation } from '@/server/translation';
import { isMobileDevice } from '@/utils/responsive';

import { Featured, Figure } from './features/Featured';
import List from './features/List';

type Props = { searchParams: { hl?: Locales } };

export const generateMetadata = async ({ searchParams }: Props) => {
  const { t, locale } = await translation('metadata', searchParams?.hl);
  return metadataModule.generate({
    alternate: true,
    description: t('discover.assistants.description'),
    locale,
    title: t('discover.assistants.title'),
    url: '/',
  });
};

const Page = async ({ searchParams }: Props) => {
  const { t } = await translation('metadata', searchParams?.hl);
  const mobile = isMobileDevice();

  const discoverService = new DiscoverService();
  const featured = await discoverService.getFeaturedProducts({});
  const products = await discoverService.getProductList({});

  const ld = ldModule.generate({
    description: t('discover.assistants.description'),
    title: t('discover.assistants.title'),
    url: '/',
    webpage: {
      enable: true,
      search: '/search',
    },
  });

  return (
    <Flexbox gap={24} width={'100%'}>
      <Flexbox gap={24} horizontal width={'100%'}>
        <Featured items={featured.data} mobile={mobile} />
        <Figure />
      </Flexbox>
      <Flexbox gap={24} horizontal style={{ position: 'relative' }} width={'100%'}>
        <Flexbox flex={1} gap={16}>
          <StructuredData ld={ld} />
          <List items={products.data} />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

Page.DisplayName = 'DiscoverAssistants';

export default Page;
