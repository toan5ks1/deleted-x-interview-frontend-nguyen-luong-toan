// @see https://github.com/unkeyed/unkey/blob/main/internal/db/src/schema/util/lifecycle_dates.ts
import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const lifecycleDates = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
};

export function takeFirst<T>(items: T[]) {
  return items.at(0);
}

export function takeFirstOrThrow<T>(items: T[]) {
  const first = takeFirst(items);

  if (!first) {
    throw new Error('First item not found');
  }

  return first;
}
