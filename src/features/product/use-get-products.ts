/* eslint-disable sort-keys-fix/sort-keys-fix */
import { useInfiniteQuery } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

import { client } from '@/libs/hono';

export type ResponseType = InferResponseType<(typeof client.api.products)['$get'], 200>;

export const useGetProducts = () => {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ['products'],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.products.$get({
        query: {
          limit: '12',
          page: (pageParam as number).toString(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    },
  });

  return query;
};
