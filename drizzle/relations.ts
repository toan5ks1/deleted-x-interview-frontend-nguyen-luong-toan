import { relations } from 'drizzle-orm/relations';

import { categories, meta, products } from './schema';

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  meta: one(meta, {
    fields: [products.metaId],
    references: [meta.id],
  }),
}));

export const metaRelations = relations(meta, ({ many }) => ({
  products: many(products),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
