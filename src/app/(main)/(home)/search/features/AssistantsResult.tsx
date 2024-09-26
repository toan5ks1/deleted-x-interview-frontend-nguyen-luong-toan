import { Locales } from '@/locales/resources';
import { DiscoverService } from '@/server/services/discover';

import List from '../../(list)/(products)/features/List';
import Back from './Back';

const AssistantsResult = async ({
  q,
  mobile,
}: {
  locale: Locales;
  mobile?: boolean;
  q: string;
}) => {
  const discoverService = new DiscoverService();
  const items = await discoverService.searchProduct(q);

  return (
    <>
      {!mobile && <Back href={'/products'} style={{ marginBottom: 0 }} />}
      <List items={items} searchKeywords={q} />
    </>
  );
};

export default AssistantsResult;
