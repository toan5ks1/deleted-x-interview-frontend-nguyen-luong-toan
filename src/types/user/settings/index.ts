import { UserGeneralConfig } from './general';
import { UserKeyVaults } from './keyVaults';
import { UserSyncSettings } from './sync';
import { UserToolConfig } from './tool';
import { UserTTSConfig } from './tts';

export * from './general';
export * from './keyVaults';
export * from './sync';
export * from './systemAgent';
export * from './tts';

/**
 * 配置设置
 */
export interface UserSettings {
  general: UserGeneralConfig;
  keyVaults: UserKeyVaults;
  sync?: UserSyncSettings;
  tool: UserToolConfig;
  tts: UserTTSConfig;
}
