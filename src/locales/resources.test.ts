import { describe, expect, it } from 'vitest';

import { normalizeLocale } from './resources';

describe('normalizeLocale', () => {
  it('should return "en-US" when locale is undefined', () => {
    expect(normalizeLocale()).toBe('en-US');
  });

  it('should return "en-US" when locale is "en"', () => {
    expect(normalizeLocale('en')).toBe('en-US');
  });

  it('should return the input locale for other valid locales', () => {
    expect(normalizeLocale('vi-VN')).toBe('vi-VN');
  });

  it('should return the input locale for unknown locales', () => {
    expect(normalizeLocale('unknown')).toBe('en-US');
  });
});
