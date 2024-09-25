'use client';

import { Grid, GridShowcase } from '@lobehub/ui';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';

import { DiscoverAssistantItem } from '@/types/discover';

import Card from './Card';

interface FeaturedProps {
  items?: DiscoverAssistantItem[];
  mobile?: boolean;
}

export const Featured = memo(({ items = [], mobile }: FeaturedProps) => {
  const featured = useMemo(() => {
    const recentLength = mobile ? 2 : 3;
    return items.slice(0, recentLength);
  }, [items, mobile]);

  return (
    <GridShowcase
      innerProps={{ gap: 24 }}
      style={{ maxHeight: 'calc(100% - 104px)', maxWidth: 1024 }}
      width={'100%'}
    >
      <Grid maxItemWidth={280} rows={4}>
        {featured.map((item) => (
          <Link href={urlJoin('/discover/assistant/', item.identifier)} key={item.identifier}>
            <Card showCategory {...item} />
          </Link>
        ))}
      </Grid>
    </GridShowcase>
  );
});

export const Figure = memo(() => {
  return (
    <Flexbox align="end" flex={1} height={'100%'} style={{ position: 'relative' }}>
      <Image
        alt={'new-arrive-figure'}
        className="object-cover rounded-sm"
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
        src="/images/figure.svg"
      />
      <Image
        alt={'new-arrive-text'}
        className="object-cover rounded-sm"
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
        src="/images/new_arrive.svg"
      />
    </Flexbox>
  );
});
