import { Icon } from '@lobehub/ui';
import { Bot } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { useGetCategories } from '@/features/categories/use-get-categories';

export const ALL_CATEGORIES = {
  id: '000',
  name: 'All',
  slug: 'all',
};

export const NO_CATEGORY = {
  id: '',
  name: '',
  slug: '',
};

export const useNav = () => {
  const pathname = usePathname();

  const { data, isLoading } = useGetCategories();
  const items = [ALL_CATEGORIES, ...(data ?? [])];

  const navItems = items.map((item) => {
    return {
      icon: <Icon icon={Bot} size={{ fontSize: 16 }} />,
      key: item.slug,
      label: item.name,
    };
  });

  const activeItem = useMemo(() => {
    return items.find((item) => pathname.includes(item.slug)) ?? NO_CATEGORY;
  }, [pathname]);

  return {
    activeItem,
    isLoading,
    navItems,
  };
};
