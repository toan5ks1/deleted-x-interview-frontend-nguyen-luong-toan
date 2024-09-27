import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { generateId } from '@/libs/id';

export const categories = pgTable('categories', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
});

export type Category = typeof categories.$inferSelect;
