// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import { getCanonicalUrl } from '@/server/utils/url';
import { PluginCategory, ProductCategory } from '@/types/discover';

import { LAST_MODIFIED, Sitemap, SitemapType } from './sitemap';

describe('Sitemap', () => {
  const sitemap = new Sitemap();

  describe('getIndex', () => {
    it('should return a valid sitemap index', () => {
      const index = sitemap.getIndex();
      expect(index).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(index).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      [SitemapType.Pages, SitemapType.Products].forEach((type) => {
        expect(index).toContain(`<loc>${getCanonicalUrl(`/sitemap/${type}.xml`)}</loc>`);
      });
      expect(index).toContain(`<lastmod>${LAST_MODIFIED}</lastmod>`);
    });
  });

  describe('getPage', () => {
    it('should return a valid page sitemap', async () => {
      const pageSitemap = await sitemap.getPage();
      expect(pageSitemap).toContainEqual(
        expect.objectContaining({
          url: getCanonicalUrl('/'),
          changeFrequency: 'monthly',
          priority: 0.4,
        }),
      );
      expect(pageSitemap).toContainEqual(
        expect.objectContaining({
          url: getCanonicalUrl('/'),
          changeFrequency: 'daily',
          priority: 0.7,
        }),
      );
      Object.values(ProductCategory).forEach((category) => {
        expect(pageSitemap).toContainEqual(
          expect.objectContaining({
            url: getCanonicalUrl(`/products/${category}`),
            changeFrequency: 'daily',
            priority: 0.7,
          }),
        );
      });
      Object.values(PluginCategory).forEach((category) => {
        expect(pageSitemap).toContainEqual(
          expect.objectContaining({
            url: getCanonicalUrl(`/discover/plugins/${category}`),
            changeFrequency: 'daily',
            priority: 0.7,
          }),
        );
      });
    });
  });

  describe('getAssistants', () => {
    it('should return a valid assistants sitemap', async () => {
      vi.spyOn(sitemap['discoverService'], 'getProductList').mockResolvedValue({
        data: [
          // @ts-ignore
          { identifier: 'test-assistant', createdAt: '2023-01-01' },
        ],
      });

      const assistantsSitemap = await sitemap.getAssistants();
      expect(assistantsSitemap.length).toBe(14);
      expect(assistantsSitemap).toContainEqual(
        expect.objectContaining({
          url: getCanonicalUrl('/product/test-assistant'),
          lastModified: '2023-01-01T00:00:00.000Z',
        }),
      );
      expect(assistantsSitemap).toContainEqual(
        expect.objectContaining({
          url: getCanonicalUrl('/product/test-assistant?hl=zh-CN'),
          lastModified: '2023-01-01T00:00:00.000Z',
        }),
      );
    });
  });
  describe('getRobots', () => {
    it('should return correct robots.txt entries', () => {
      const robots = sitemap.getRobots();
      expect(robots).toContain(getCanonicalUrl('/sitemap-index.xml'));
      [SitemapType.Pages, SitemapType.Products].forEach((type) => {
        expect(robots).toContain(getCanonicalUrl(`/sitemap/${type}.xml`));
      });
    });
  });
});
