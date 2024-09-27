/* eslint-disable sort-keys-fix/sort-keys-fix */
import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { generateId } from '@/libs/id';

import { lifecycleDates } from '../utils';
import { Category, categories } from './categories';
import { Meta, meta } from './meta';

export const products = pgTable('products', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  author: varchar('author', { length: 255 }).notNull(),
  homepage: varchar('homepage', { length: 255 }),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  schemaVersion: integer('schema_version').notNull(),
  isFeatured: boolean('is_featured').notNull().default(false),
  categoryId: varchar('category_id', { length: 30 })
    .references(() => categories.id, { onDelete: 'cascade' })
    .notNull(), // foreign key to 'category'
  metaId: varchar('meta_id', { length: 30 })
    .references(() => meta.id, { onDelete: 'cascade' })
    .notNull(), // foreign key to 'category'
  ...lifecycleDates,
});

export const productRelations = relations(products, ({ one }) => ({
  meta: one(meta, { fields: [products.metaId], references: [meta.id] }),
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
}));

export type Product = typeof products.$inferSelect;

export type ProductItem = {
  category?: Category | null;
  meta?: Meta | null;
  product?: Product | null;
};
