import { redirect } from 'next/navigation';

import StructuredData from '@/components/StructuredData';
import { Locales } from '@/locales/resources';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { DiscoverService } from '@/server/services/discover';
import { translation } from '@/server/translation';
import { isMobileDevice } from '@/utils/responsive';

import List from '../../features/List';
import Back from './features/Back';

type Props = {
  params: { slug: string };
  searchParams: {
    hl?: Locales;
    q?: string;
  };
};

export const generateMetadata = async ({ searchParams }: Props) => {
  const { t, locale } = await translation('metadata', searchParams?.hl);

  return metadataModule.generate({
    alternate: true,
    description: t('discover.description'),
    locale,
    title: t('discover.search'),
    url: '/search',
  });
};

const Page = async ({ params, searchParams }: Props) => {
  const { q } = searchParams;

  if (!q) redirect('/');

  const keywords = decodeURIComponent(q);
  const category = params.slug !== 'all' ? params.slug : undefined;

  const discoverService = new DiscoverService();
  const items = await discoverService.searchProduct(q, category);

  const { t } = await translation('metadata', searchParams?.hl);
  const mobile = isMobileDevice();

  const ld = ldModule.generate({
    description: t('discover.description'),
    title: t('discover.search'),
    url: '/search',
    webpage: {
      enable: true,
      search: '/search',
    },
  });

  return (
    <>
      <StructuredData ld={ld} />
      {!mobile && <Back href={'/'} style={{ marginBottom: 0 }} />}
      <List items={items} searchKeywords={keywords} />
    </>
  );
};

Page.DisplayName = 'DiscoverSearch';

export default Page;
