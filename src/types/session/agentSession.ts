import { LobeAgentConfig } from '@/types/agent';

import { MetaData } from '../meta';

export interface LobeAgentSettings {
  /**
   * 语言模型角色设定
   */
  config: LobeAgentConfig;
  meta: MetaData;
}
