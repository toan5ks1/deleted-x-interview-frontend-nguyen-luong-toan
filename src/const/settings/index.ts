import { UserSettings } from '@/types/user/settings';

import { DEFAULT_COMMON_SETTINGS } from './common';
import { DEFAULT_SYNC_CONFIG } from './sync';
import { DEFAULT_TOOL_CONFIG } from './tool';
import { DEFAULT_TTS_CONFIG } from './tts';

export const COOKIE_CACHE_DAYS = 30;

export * from './tool';
export * from './tts';

export const DEFAULT_SETTINGS: UserSettings = {
  general: DEFAULT_COMMON_SETTINGS,
  keyVaults: {},
  sync: DEFAULT_SYNC_CONFIG,
  tool: DEFAULT_TOOL_CONFIG,
  tts: DEFAULT_TTS_CONFIG,
};
