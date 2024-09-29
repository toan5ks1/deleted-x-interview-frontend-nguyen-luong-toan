import StructuredData from '@/components/StructuredData';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { DiscoverService } from '@/server/services/discover';
import { translation } from '@/server/translation';
import { isMobileDevice } from '@/utils/responsive';

import List from '../features/List';
import Pagination from '../features/Pagination';
import { SearchParamsProductProps } from '../page';
import Back from './features/Back';

type Props = {
  params: { slug: string };
  searchParams: SearchParamsProductProps;
};

export const generateMetadata = async ({ searchParams }: Props) => {
  const { t, locale } = await translation('metadata', searchParams?.hl);

  return metadataModule.generate({
    alternate: true,
    description: t('discover.description'),
    locale,
    title: t('discover.search'),
    url: '/category',
  });
};

const Page = async ({ params, searchParams }: Props) => {
  const category = params.slug !== 'all' ? params.slug : undefined;
  const { limit, page, q } = searchParams;

  const keyword = q ? decodeURIComponent(q) : undefined;

  const discoverService = new DiscoverService();
  const items = await discoverService.getProducts({ category, keyword, limit, page });

  const { t } = await translation('metadata', searchParams?.hl);
  const mobile = isMobileDevice();

  const ld = ldModule.generate({
    description: t('discover.description'),
    title: t('discover.search'),
    url: '/',
    webpage: {
      enable: true,
      search: '/',
    },
  });

  return (
    <>
      <StructuredData ld={ld} />
      {!mobile && <Back href={'/'} style={{ marginBottom: 0, maxWidth: 'fit-content' }} />}
      <List items={items.data} searchKeywords={keyword} total={items.total} />
      <Pagination limit={limit} page={page} total={items.total} />
    </>
  );
};

Page.DisplayName = 'DiscoverSearch';

export default Page;
