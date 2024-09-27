/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Hono } from 'hono';

import { db } from '@/db';
import { categories } from '@/db/schema';

const app = new Hono().get('/', async (c) => {
  const data = await db.select().from(categories);

  return c.json({
    data,
  });
});

export default app;
