/* eslint-disable sort-keys-fix/sort-keys-fix */

/* eslint-disable typescript-sort-keys/interface */
import { InferResponseType } from 'hono';

import { client } from '@/libs/hono';

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
  baseUrl = `${
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_VERCEL_APP_URL!
      : process.env.NEXT_PUBLIC_APP_URL!
  }/api/products`;

  createQueryParams = (params: Record<string, any>): string => {
    const query = new URLSearchParams();

    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        // Handle arrays by joining them with commas
        if (Array.isArray(params[key])) {
          query.append(key, params[key].join(','));
        } else {
          query.append(key, params[key]);
        }
      }
    }

    return query.toString();
  };

  /** Products query **/
  getProducts = async ({
    page = 1,
    limit = PAGE_SIZE,
    ...rest
  }: GetProductProps): Promise<ProductList> => {
    const url = `${this.baseUrl}?${this.createQueryParams({ page, limit, ...rest })}` as string;

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
