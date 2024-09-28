import urlJoin from 'url-join';

const isVercelPreview = process.env.VERCEL === '1' && process.env.VERCEL_ENV !== 'production';

const vercelPreviewUrl = `https://${process.env.VERCEL_URL}`;

const siteUrl = isVercelPreview ? vercelPreviewUrl : 'https://lobechat.com';

export const getCanonicalUrl = (...paths: string[]) => urlJoin(siteUrl, ...paths);

export const createQueryParams = (params: Record<string, any>): string => {
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

export const domain =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_VERCEL_APP_URL!
    : process.env.NEXT_PUBLIC_APP_URL!;
