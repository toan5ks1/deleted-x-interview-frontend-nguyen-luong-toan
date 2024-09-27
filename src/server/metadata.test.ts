// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { BRANDING_NAME } from '@/const/branding';
import { OG_URL } from '@/const/url';

import { Meta } from './metadata';

describe('Metadata', () => {
  const meta = new Meta();

  describe('generate', () => {
    it('should generate metadata with default values', () => {
      const result = meta.generate({
        title: 'Test Title',
        url: 'https://example.com',
      });

      expect(result).toMatchObject({
        title: 'Test Title',
        description: expect.any(String),
        openGraph: expect.objectContaining({
          title: `Test Title · ${BRANDING_NAME}`,
          description: expect.any(String),
          images: [{ url: OG_URL, alt: `Test Title · ${BRANDING_NAME}` }],
        }),
        twitter: expect.objectContaining({
          title: `Test Title · ${BRANDING_NAME}`,
          description: expect.any(String),
          images: [OG_URL],
        }),
      });
    });
  });

  describe('genTwitter', () => {
    it('should generate Twitter metadata correctly', () => {
      const result = (meta as any).genTwitter({
        title: 'Twitter Title',
        description: 'Twitter description',
        image: 'https://twitter-image.com',
        url: 'https://example.com/twitter',
      });

      expect(result).toEqual({
        card: 'summary_large_image',
        title: 'Twitter Title',
        description: 'Twitter description',
        images: ['https://twitter-image.com'],
        site: '@lobehub',
        url: 'https://example.com/twitter',
      });
    });
  });
});
