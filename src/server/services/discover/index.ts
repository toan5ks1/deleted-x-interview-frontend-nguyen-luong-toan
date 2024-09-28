/* eslint-disable sort-keys-fix/sort-keys-fix */

/* eslint-disable typescript-sort-keys/interface */
import { InferResponseType } from 'hono';

import { client } from '@/libs/hono';
import { createQueryParams, domain } from '@/server/utils/url';

const PAGE_SIZE = 12;
const REVALIDATE = 120;

interface GetProductProps {
  category?: string;
  keyword?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}

export type ProductList = InferResponseType<(typeof client.api.products)['$get'], 200>;

export class DiscoverService {
  baseUrl = `${domain}/api/products`;

  /** Products query **/
  getProducts = async ({
    page = 1,
    limit = PAGE_SIZE,
    ...rest
  }: GetProductProps): Promise<ProductList> => {
    const url = `${this.baseUrl}?${createQueryParams({ page, limit, ...rest })}` as string;

    let res = await fetch(url, {
      next: { revalidate: REVALIDATE },
    });

    if (!res.ok) {
      res = await fetch(url, {
        next: { revalidate: REVALIDATE },
      });
    }

    if (!res.ok) return { data: [], nextPage: 0 };

    const json = await res.json();

    return json as ProductList;
  };
}
