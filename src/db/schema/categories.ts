import { relations } from 'drizzle-orm';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { generateId } from '@/libs/id';

import { meta } from './meta';

export const categories = pgTable('categories', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
});

// Relationships
export const categoryRelations = relations(categories, ({ many }) => ({
  metas: many(meta), // One category has many 'meta' entries
}));

export type Category = typeof categories.$inferSelect;
