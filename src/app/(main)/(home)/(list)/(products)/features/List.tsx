'use client';

import { Empty } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductList } from '@/server/services/discover';

import SearchResultCount from '../../../components/SearchResultCount';
import Title from '../../../components/Title';
import VirtuosoGridList from '../../../components/VirtuosoGridList';
import Card from './Card';

export interface ListProps {
  category?: string;
  items?: ProductList['data'];
  searchKeywords?: string;
}

const List = memo<ListProps>(({ category, searchKeywords, items = [] }) => {
  const { t } = useTranslation('discover');

  if (searchKeywords) {
    if (!items || items?.length === 0) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    return (
      <>
        <SearchResultCount count={items.length} keyword={searchKeywords} />
        <VirtuosoGridList
          data={items}
          initialItemCount={24}
          itemContent={(_, item) => <Card showCategory variant={'compact'} {...item} />}
          style={{
            minHeight: '75vh',
          }}
        />
      </>
    );
  }

  return (
    items &&
    items?.length > 0 && (
      <>
        <Title tag={items.length}>{t('assistants.list')}</Title>
        <VirtuosoGridList
          data={items}
          initialItemCount={12}
          itemContent={(_, item) => <Card showCategory={!category} variant={'compact'} {...item} />}
          style={{
            minHeight: '75vh',
          }}
        />
      </>
    )
  );
});

export default List;
