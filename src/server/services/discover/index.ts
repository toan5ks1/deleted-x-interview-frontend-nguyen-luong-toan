import { cloneDeep, merge } from 'lodash-es';
import pMap from 'p-map';

import { DEFAULT_DISCOVER_ASSISTANT_ITEM } from '@/const/discover';
import { DEFAULT_LANG } from '@/const/locale';
import { Locales } from '@/locales/resources';
import { AssistantStore } from '@/server/modules/AssistantStore';
import { AssistantCategory, DiscoverAssistantItem } from '@/types/discover';

const revalidate: number = 3600;

export class DiscoverService {
  assistantStore = new AssistantStore();
  // Assistants
  searchAssistant = async (locale: Locales, keywords: string): Promise<DiscoverAssistantItem[]> => {
    const list = await this.getAssistantList(locale);
    return list.filter((item) => {
      return [item.author, item.meta.title, item.meta.description, item.meta?.tags]
        .flat()
        .filter(Boolean)
        .join(',')
        .toLowerCase()
        .includes(decodeURIComponent(keywords).toLowerCase());
    });
  };

  getAssistantCategory = async (
    locale: Locales,
    category: AssistantCategory,
  ): Promise<DiscoverAssistantItem[]> => {
    const list = await this.getAssistantList(locale);
    return list.filter((item) => item.meta.category === category);
  };

  getAssistantList = async (locale: Locales): Promise<DiscoverAssistantItem[]> => {
    let res = await fetch(this.assistantStore.getAgentIndexUrl(locale), {
      next: { revalidate },
    });

    if (!res.ok) {
      res = await fetch(this.assistantStore.getAgentIndexUrl(DEFAULT_LANG), {
        next: { revalidate },
      });
    }

    if (!res.ok) return [];

    const json = await res.json();

    return json.agents;
  };

  getAssistantById = async (
    locale: Locales,
    identifier: string,
  ): Promise<DiscoverAssistantItem | undefined> => {
    let res = await fetch(this.assistantStore.getAgentUrl(identifier, locale), {
      next: { revalidate: 12 * revalidate },
    });

    if (!res.ok) {
      res = await fetch(this.assistantStore.getAgentUrl(DEFAULT_LANG), {
        next: { revalidate: 12 * revalidate },
      });
    }

    if (!res.ok) return;

    let assistant = await res.json();

    if (!assistant) return;

    assistant = merge(cloneDeep(DEFAULT_DISCOVER_ASSISTANT_ITEM), assistant);

    const categoryItems = await this.getAssistantCategory(
      locale,
      assistant.meta.category || AssistantCategory.General,
    );

    assistant = {
      ...assistant,
      suggestions: categoryItems
        .filter((item) => item.identifier !== assistant.identifier)
        .slice(0, 5) as any,
    };

    return assistant;
  };

  getAssistantByIds = async (
    locale: Locales,
    identifiers: string[],
  ): Promise<DiscoverAssistantItem[]> => {
    const list = await pMap(
      identifiers,
      async (identifier) => this.getAssistantById(locale, identifier),
      {
        concurrency: 5,
      },
    );

    return list.filter(Boolean) as DiscoverAssistantItem[];
  };
}
