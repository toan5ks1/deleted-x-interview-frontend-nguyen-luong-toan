/* eslint-disable sort-keys-fix/sort-keys-fix */
import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { generateId } from '@/libs/id';

import { lifecycleDates } from '../utils';
import { meta } from './meta';

export const products = pgTable('products', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(),
  author: varchar('author', { length: 255 }).notNull(),
  homepage: varchar('homepage', { length: 255 }),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  schemaVersion: integer('schema_version').notNull(),
  metaId: varchar('meta_id', { length: 30 })
    .references(() => meta.id, { onDelete: 'cascade' })
    .notNull(), // foreign key to 'category'
  ...lifecycleDates,
});

export const productRelations = relations(products, ({ one }) => ({
  meta: one(meta, { fields: [products.metaId], references: [meta.id] }), // Content belongs to a 'meta'
}));

export type Product = typeof products.$inferSelect;
