// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_LANG } from '@/const/locale';
import { AssistantCategory, PluginCategory } from '@/types/discover';

import { DiscoverService } from './index';

// 模拟 fetch 函数
global.fetch = vi.fn();

describe('DiscoverService', () => {
  let service: DiscoverService;

  beforeEach(() => {
    service = new DiscoverService();
    vi.resetAllMocks();
  });

  describe('Assistants', () => {
    it('should search assistants', async () => {
      const mockAssistants = [
        {
          author: 'John',
          meta: { title: 'Test Assistant', description: 'A test assistant', tags: ['test'] },
        },
        {
          author: 'Jane',
          meta: {
            title: 'Another Assistant',
            description: 'Another test assistant',
            tags: ['demo'],
          },
        },
      ];

      vi.spyOn(service, 'getAssistantList').mockResolvedValue(mockAssistants as any);

      const result = await service.searchAssistant('en-US', 'A test assistant');
      expect(result).toHaveLength(1);
      expect(result[0].author).toBe('John');
    });

    it('should get assistant category', async () => {
      const mockAssistants = [
        { meta: { category: AssistantCategory.General } },
        { meta: { category: AssistantCategory.Academic } },
      ];

      vi.spyOn(service, 'getAssistantList').mockResolvedValue(mockAssistants as any);

      const result = await service.getAssistantCategory('en-US', AssistantCategory.General);
      expect(result).toHaveLength(1);
      expect(result[0].meta.category).toBe(AssistantCategory.General);
    });

    it('should get assistant list', async () => {
      const mockResponse = { agents: [{ id: 'test-assistant' }] };
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await service.getAssistantList('en-US');
      expect(result).toEqual(mockResponse.agents);
    });

    it('should get assistant by id', async () => {
      const mockAssistant = {
        identifier: 'test-assistant',
        meta: { category: AssistantCategory.General },
      };

      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockAssistant),
      } as any);

      vi.spyOn(service, 'getAssistantCategory').mockResolvedValue([]);

      const result = await service.getAssistantById('en-US', 'test-assistant');

      expect(result).toBeDefined();
      expect(result?.identifier).toBe('test-assistant');
    });

    it('should get assistants by ids', async () => {
      const mockAssistants = [{ identifier: 'assistant1' }, { identifier: 'assistant2' }];

      vi.spyOn(service, 'getAssistantById').mockImplementation(
        async (_, id) => mockAssistants.find((a) => a.identifier === id) as any,
      );

      const result = await service.getAssistantByIds('en-US', [
        'assistant1',
        'assistant2',
        'nonexistent',
      ]);
      expect(result).toHaveLength(2);
      expect(result[0].identifier).toBe('assistant1');
      expect(result[1].identifier).toBe('assistant2');
    });
  });
});
