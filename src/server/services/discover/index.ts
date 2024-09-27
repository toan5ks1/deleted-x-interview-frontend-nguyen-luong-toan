/* eslint-disable sort-keys-fix/sort-keys-fix */

/* eslint-disable typescript-sort-keys/interface */
import { InferResponseType } from 'hono';

import { client } from '@/libs/hono';

const revalidate: number = 3600;

interface GetProductProps {
  page?: number;
  limit?: number;
}

export type ProductList = InferResponseType<(typeof client.api.products)['$get'], 200>;

export class DiscoverService {
  baseUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/products`;
  // Products
  searchProduct = async (keywords: string): Promise<ProductList['data']> => {
    const list = await this.getProductList({ page: 1, limit: 100 }); // Simply search at first 100 rows with no locale
    return list.data.filter((item) => {
      return [item.product?.author, item.meta?.title, item.meta?.description, item.meta?.tags]
        .flat()
        .filter(Boolean)
        .join(',')
        .toLowerCase()
        .includes(decodeURIComponent(keywords).toLowerCase());
    });
  };

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

  // getProductCategory = async (
  //   locale: Locales,
  //   category: ProductCategory,
  // ): Promise<Product[]> => {
  //   const list = await this.getProductList(locale);
  //   return list.filter((item) => item.meta.category === category);
  // };

  getProductList = async ({ page = 1, limit = 12 }: GetProductProps): Promise<ProductList> => {
    const url = `${this.baseUrl}?${this.createQueryParams({ page, limit })}` as string;

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

    if (!res.ok) return { data: [], nextPage: 0 };

    const json = await res.json();

    return json as ProductList;
  };

  getFeaturedProducts = async ({ page = 1, limit = 3 }: GetProductProps): Promise<ProductList> => {
    const url = `${this.baseUrl}/featured?${this.createQueryParams({ page, limit })}` as string;

    let res = await fetch(url, {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      res = await fetch(url, {
        next: { revalidate: 120 },
      });
    }

    if (!res.ok) return { data: [], nextPage: 0 };

    const json = await res.json();

    return json as ProductList;
  };
}
