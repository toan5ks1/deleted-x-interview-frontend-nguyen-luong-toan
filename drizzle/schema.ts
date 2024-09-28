/* eslint-disable sort-keys-fix/sort-keys-fix */
import { sql } from 'drizzle-orm';
import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

export const categories = pgTable(
  'categories',
  {
    id: varchar('id', { length: 30 }).primaryKey().notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
  },
  (table) => {
    return {
      categoriesNameUnique: unique('categories_name_unique').on(table.name),
      categoriesSlugUnique: unique('categories_slug_unique').on(table.slug),
    };
  },
);

export const meta = pgTable('meta', {
  id: varchar('id', { length: 30 }).primaryKey().notNull(),
  avatar: varchar('avatar', { length: 10 }),
  description: varchar('description', { length: 500 }),
  title: varchar('title', { length: 255 }),
  tags: text('tags'),
});

export const products = pgTable(
  'products',
  {
    id: varchar('id', { length: 30 }).primaryKey().notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    homepage: varchar('homepage', { length: 255 }),
    identifier: varchar('identifier', { length: 255 }).notNull(),
    schemaVersion: integer('schema_version').notNull(),
    metaId: varchar('meta_id', { length: 30 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
    isFeatured: boolean('is_featured').default(false).notNull(),
    categoryId: varchar('category_id', { length: 30 }).notNull(),
  },
  (table) => {
    return {
      productsMetaIdMetaIdFk: foreignKey({
        columns: [table.metaId],
        foreignColumns: [meta.id],
        name: 'products_meta_id_meta_id_fk',
      }).onDelete('cascade'),
      productsCategoryIdCategoriesIdFk: foreignKey({
        columns: [table.categoryId],
        foreignColumns: [categories.id],
        name: 'products_category_id_categories_id_fk',
      }).onDelete('cascade'),
    };
  },
);
