/* eslint-disable sort-keys-fix/sort-keys-fix */
import { zValidator } from '@hono/zod-validator';
import { desc, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';

import { db } from '@/db';
import { categories } from '@/db/schema';
import { meta } from '@/db/schema/meta';
import { products } from '@/db/schema/products';

const app = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid('query');

      const data = await db
        .select({
          product: products,
          meta: meta,
          categories: categories,
        })
        .from(products)
        .leftJoin(meta, eq(products.metaId, meta.id)) // Join meta table
        .leftJoin(categories, eq(products.categoryId, categories.id)) // Join categories table
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(products.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    },
  )
  .get(
    '/featured',
    zValidator(
      'query',
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid('query');
      const data = await db
        .select({
          product: products,
          meta: meta,
          categories: categories,
        })
        .from(products)
        .where(eq(products.isFeatured, true))
        .leftJoin(meta, eq(products.metaId, meta.id)) // Join meta table
        .leftJoin(categories, eq(products.categoryId, categories.id)) // Join categories table
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(products.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    },
  )
  .get(
    '/with-featured',
    zValidator(
      'query',
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid('query');
      const [featured, paginated] = await Promise.all([
        db
          .select({
            product: products,
            meta: meta,
            categories: categories,
          })
          .from(products)
          .where(eq(products.isFeatured, true))
          .leftJoin(meta, eq(products.metaId, meta.id)) // Join meta table
          .leftJoin(categories, eq(products.categoryId, categories.id)) // Join categories table
          .limit(3)
          .orderBy(desc(products.updatedAt)),

        db
          .select({
            product: products,
            meta: meta,
            categories: categories,
          })
          .from(products)
          .leftJoin(meta, eq(products.metaId, meta.id)) // Join meta table
          .leftJoin(categories, eq(products.categoryId, categories.id)) // Join categories table
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy(desc(products.updatedAt)),
      ]);

      return c.json({
        featured,
        paginated,
        nextPage: paginated.length === limit ? page + 1 : null,
      });
    },
  );

export default app;
