/* eslint-disable sort-keys-fix/sort-keys-fix */

/* eslint-disable typescript-sort-keys/interface */
import { InferResponseType } from 'hono';

import { client } from '@/libs/hono';

const revalidate: number = 3600;

export type CategoryList = InferResponseType<(typeof client.api.categories)['$get'], 200>;

export class MasterService {
  baseUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api`;

  getCategories = async (): Promise<CategoryList> => {
    const url = `${this.baseUrl}/categories/}` as string;

    let res = await fetch(url, {
      next: { revalidate },
      // cache: 'no-store',
    });

    if (!res.ok) {
      res = await fetch(url, {
        next: { revalidate },
        // cache: 'no-store',
      });
    }

    if (!res.ok) return { data: [] };

    const json = await res.json();

    return json as CategoryList;
  };
}
