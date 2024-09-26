'use client';

import Link from 'next/link';
import { memo } from 'react';
import urlJoin from 'url-join';

import { useQueryRoute } from '@/hooks/useQueryRoute';
import { AssistantCategory } from '@/types/discover';

import CategoryMenu from '../../../components/CategoryMenu';
import { useCategory } from './useCategory';

const Category = memo(() => {
  const items = useCategory();
  const router = useQueryRoute();

  return (
    <CategoryMenu
      items={items.map((item: any) => ({
        ...item,
        label: (
          <Link href={urlJoin('/', item.key === AssistantCategory.All ? '' : item.key)}>
            {item.label}
          </Link>
        ),
      }))}
      onSelect={({ key }) => {
        router.push(urlJoin('/', key === AssistantCategory.All ? '' : key));
      }}
    />
  );
});

export default Category;
