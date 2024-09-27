import { hc } from 'hono/client';

import { AppType } from '@/app/api/[[...route]]/route';

export const client = hc<AppType>(
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_VERCEL_APP_URL!
    : process.env.NEXT_PUBLIC_APP_URL!,
);
