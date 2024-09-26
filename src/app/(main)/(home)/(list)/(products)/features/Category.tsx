'use client';

import Link from 'next/link';
import { memo } from 'react';
import urlJoin from 'url-join';

import { useQueryRoute } from '@/hooks/useQueryRoute';
import { ProductCategory } from '@/types/discover';

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
          <Link href={urlJoin('/', item.key === ProductCategory.All ? '' : item.key)}>
            {item.label}
          </Link>
        ),
      }))}
      onSelect={({ key }) => {
        router.push(urlJoin('/', key === ProductCategory.All ? '' : key));
      }}
    />
  );
});

export default Category;
