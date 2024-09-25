import { Locales } from '@/locales/resources';
import { DiscoverService } from '@/server/services/discover';

import List from '../../(list)/(products)/features/List';
import Back from './Back';

const AssistantsResult = async ({
  locale,
  q,
  mobile,
}: {
  locale: Locales;
  mobile?: boolean;
  q: string;
}) => {
  const discoverService = new DiscoverService();
  const items = await discoverService.searchAssistant(locale, q);

  return (
    <>
      {!mobile && <Back href={'/discover/assistants'} style={{ marginBottom: 0 }} />}
      <List items={items} searchKeywords={q} />
    </>
  );
};

export default AssistantsResult;
