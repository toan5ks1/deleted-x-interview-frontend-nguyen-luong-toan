'use client';

import { usePathname } from 'next/navigation';
import { memo } from 'react';

import Pagination from '@/components/Pagination';
import { useQueryRoute } from '@/hooks/useQueryRoute';

export interface PaginationProps {
  limit?: number;
  page?: number;
  total?: number;
}

const ListPagination = memo<PaginationProps>(({ limit = 12, page, total }) => {
  const pathname = usePathname();
  const router = useQueryRoute();

  const onPaging = (page: any, pageSize: any) => {
    router.replace(
      pathname,
      {
        query: { limit: pageSize, page },
      },
      { scroll: false },
    );
  };

  return (
    <Pagination defaultCurrent={page} defaultPageSize={limit} onChange={onPaging} total={total} />
  );
});

export default ListPagination;
