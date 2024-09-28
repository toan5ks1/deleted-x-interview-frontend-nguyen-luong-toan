/* eslint-disable sort-keys-fix/sort-keys-fix */
import { zValidator } from '@hono/zod-validator';
import { and, desc, eq, ilike, or } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '@/db';
import { categories } from '@/db/schema';
import { meta } from '@/db/schema/meta';
import { products } from '@/db/schema/products';

const app = new Hono().get(
  '/',
  zValidator(
    'query',
    z.object({
      category: z.string().optional(),
      featured: z.string().optional(),
      keyword: z.string().optional(),
      page: z.coerce.number(),
      limit: z.coerce.number(),
    }),
  ),
  async (c) => {
    const { category, featured, keyword, page, limit } = c.req.valid('query');

    const withCategory = category ? eq(categories.slug, category) : undefined;
    const withFeatured = featured ? eq(products.isFeatured, true) : undefined;
    // Keyword search filter
    const withKeyword = keyword
      ? or(
          ilike(products.author, `%${keyword}%`), // Search in product author
          ilike(meta.title, `%${keyword}%`), // Search in meta title
          ilike(meta.description, `%${keyword}%`), // Search in meta description
          ilike(meta.tags, `%${keyword}%`), // Search within comma-separated tags
        )
      : undefined;

    const data = await db
      .select({
        product: products,
        meta: meta,
        categories: categories,
      })
      .from(products)
      .leftJoin(meta, eq(products.metaId, meta.id)) // Join meta table
      .leftJoin(categories, eq(products.categoryId, categories.id)) // Join categories table
      .where(and(withCategory, withFeatured, withKeyword)) // Apply conditions if any
      .groupBy(products.id, meta.id, categories.id) // Group by these columns
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(products.updatedAt));

    return c.json({
      data,
      nextPage: data.length === limit ? page + 1 : null,
    });
  },
);

export default app;
