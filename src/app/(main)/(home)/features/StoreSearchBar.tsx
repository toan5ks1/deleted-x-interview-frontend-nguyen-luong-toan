'use client';

import { SearchBar, SearchBarProps } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '@/hooks/useDebounce';
import { useQueryRoute } from '@/hooks/useQueryRoute';

export const useStyles = createStyles(({ css, prefixCls, token }) => ({
  active: css`
    box-shadow: ${token.boxShadow};
  `,
  bar: css`
    .${prefixCls}-input-group-wrapper {
      padding: 0;
    }
  `,
}));

interface StoreSearchBarProps extends SearchBarProps {
  mobile?: boolean;
}

const StoreSearchBar = memo<StoreSearchBarProps>(({ mobile, onBlur, onFocus, ...rest }) => {
  const [active, setActive] = useState(false);
  const [searchKey, setSearchKey] = useQueryState('q');
  const debouncedSearchKey = useDebounce(searchKey);
  const pathname = usePathname();

  const { t } = useTranslation('discover');
  const { cx, styles } = useStyles();
  const router = useQueryRoute();

  const handleSearch = () => {
    if (debouncedSearchKey) {
      router.replace(
        pathname === '/' ? 'all' : pathname,
        {
          query: { q: debouncedSearchKey },
        },
        { scroll: false },
      );
    } else {
      router.push(pathname, { query: {}, replace: true });
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchKey]);

  return (
    <SearchBar
      allowClear
      autoFocus={mobile || active}
      className={cx(styles.bar, active && styles.active)}
      defaultValue={searchKey ? String(searchKey) : ''}
      enableShortKey={!mobile}
      onBlur={(e) => {
        setActive(false);
        onBlur?.(e);
      }}
      onChange={(e) => setSearchKey(e.target.value)}
      onFocus={(e) => {
        setActive(true);
        onFocus?.(e);
      }}
      onSearch={handleSearch}
      placeholder={t('search.placeholder')}
      shortKey={'k'}
      spotlight={!mobile}
      style={{ width: mobile || active ? '100%' : 'min(480px,100%)' }}
      styles={{ input: { width: '100%' } }}
      type={'block'}
      value={searchKey ? String(searchKey) : ''}
      {...rest}
    />
  );
});

export default StoreSearchBar;
