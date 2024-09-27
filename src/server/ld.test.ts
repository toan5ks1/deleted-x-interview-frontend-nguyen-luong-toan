// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { DEFAULT_LANG } from '@/const/locale';

import { AUTHOR_LIST, Ld } from './ld';

describe('Ld', () => {
  const ld = new Ld();

  describe('generate', () => {
    it('should generate correct LD+JSON structure', () => {
      const result = ld.generate({
        title: 'Test Title',
        description: 'Test Description',
        url: 'https://example.com/test',
        locale: DEFAULT_LANG,
      });

      expect(result['@context']).toBe('https://schema.org');
      expect(Array.isArray(result['@graph'])).toBe(true);
      expect(result['@graph'].length).toBeGreaterThan(0);
    });
  });

  describe('genOrganization', () => {
    it('should generate correct organization structure', () => {
      const org = ld.genOrganization();

      expect(org['@type']).toBe('Organization');
      expect(org.name).toBe('LobeHub');
      expect(org.url).toBe('https://lobehub.com/');
    });
  });

  describe('getAuthors', () => {
    it('should return default author when no ids provided', () => {
      const author = ld.getAuthors();
      expect(author['@type']).toBe('Organization');
    });

    it('should return person when valid id provided', () => {
      const author = ld.getAuthors(['arvinxx']);
      expect(author['@type']).toBe('Person');
      // @ts-ignore
      expect(author.name).toBe(AUTHOR_LIST.arvinxx.name);
    });
  });

  describe('genImageObject', () => {
    it('should generate correct image object', () => {
      const image = ld.genImageObject({
        image: 'https://example.com/image.jpg',
        url: 'https://example.com/test',
      });

      expect(image['@type']).toBe('ImageObject');
      expect(image.url).toBe('https://example.com/image.jpg');
    });
  });
});
