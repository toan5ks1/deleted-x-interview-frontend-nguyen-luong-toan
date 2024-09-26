/* eslint-disable sort-keys-fix/sort-keys-fix */
import { relations } from 'drizzle-orm';
import { json, pgTable, varchar } from 'drizzle-orm/pg-core';

import { generateId } from '@/libs/id';

import { categories } from './categories';

export const meta = pgTable('meta', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  avatar: varchar('avatar', { length: 10 }),
  description: varchar('description', { length: 500 }),
  title: varchar('title', { length: 255 }),
  categoryId: varchar('category_id', { length: 30 })
    .references(() => categories.id, { onDelete: 'cascade' })
    .notNull(), // foreign key to 'category'
  tags: json('tags').$type<string[]>().notNull(),
});

export const metaRelations = relations(meta, ({ one }) => ({
  category: one(categories, { fields: [meta.categoryId], references: [categories.id] }), // Meta belongs to a category
}));

export type Meta = typeof meta.$inferSelect;
