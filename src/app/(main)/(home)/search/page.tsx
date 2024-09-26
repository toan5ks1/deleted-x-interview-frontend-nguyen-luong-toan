import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import urlJoin from 'url-join';

import StructuredData from '@/components/StructuredData';
import { Locales } from '@/locales/resources';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { translation } from '@/server/translation';
import { isMobileDevice } from '@/utils/responsive';

import { ListLoadingWithoutBanner } from '../components/ListLoading';

const AssistantsResult = dynamic(() => import('./features/AssistantsResult'), {
  loading: () => <ListLoadingWithoutBanner />,
});

type Props = {
  searchParams: {
    hl?: Locales;
    q?: string;
    type?: 'assistants' | 'plugins' | 'models' | 'providers';
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

const Page = async ({ searchParams }: Props) => {
  const { q, type = 'assistants' } = searchParams;
  if (!q) redirect(urlJoin(`/discover`, type));
  const keywords = decodeURIComponent(q);

  const { t, locale } = await translation('metadata', searchParams?.hl);
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
      {type === 'assistants' && <AssistantsResult locale={locale} mobile={mobile} q={keywords} />}
    </>
  );
};

Page.DisplayName = 'DiscoverSearch';

export default Page;
