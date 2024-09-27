import urlJoin from 'url-join';

import StructuredData from '@/components/StructuredData';
import { Locales } from '@/locales/resources';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { DiscoverService } from '@/server/services/discover';
import { translation } from '@/server/translation';
import { ProductCategory } from '@/types/discover';

import List from '../features/List';

type Props = { params: { slug: ProductCategory }; searchParams: { hl?: Locales } };

export const generateMetadata = async ({ params, searchParams }: Props) => {
  const { t, locale } = await translation('metadata', searchParams?.hl);
  const { t: td } = await translation('discover', searchParams?.hl);

  return metadataModule.generate({
    alternate: true,
    description: t('discover.assistants.description'),
    locale,
    title: [td(`category.assistant.${params.slug}`), t('discover.assistants.title')].join(' · '),
    url: urlJoin('/', params.slug),
  });
};

const Page = async ({ params, searchParams }: Props) => {
  const { t } = await translation('metadata', searchParams?.hl);
  const { t: td } = await translation('discover', searchParams?.hl);
  const category = params.slug !== 'all' ? params.slug : '';

  const discoverService = new DiscoverService();
  const items = await discoverService.getProductCategory({ category });

  const ld = ldModule.generate({
    description: t('discover.assistants.description'),
    title: [td(`category.assistant.${params.slug}`), t('discover.assistants.title')].join(' · '),
    url: urlJoin('/', params.slug),
    webpage: {
      enable: true,
      search: '/search',
    },
  });

  return (
    <>
      <StructuredData ld={ld} />
      <List category={params.slug} items={items.data} />
    </>
  );
};

export const generateStaticParams = async () => {
  const cates = Object.values(ProductCategory);
  return cates.map((cate) => ({
    slug: cate,
  }));
};

Page.DisplayName = 'DiscoverAssistantsCategory';

export default Page;
