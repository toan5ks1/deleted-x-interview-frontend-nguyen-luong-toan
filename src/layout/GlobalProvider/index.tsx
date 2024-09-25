import { cookies, headers } from 'next/headers';
import { FC, PropsWithChildren } from 'react';
import { resolveAcceptLanguage } from 'resolve-accept-language';

import { LOBE_LOCALE_COOKIE } from '@/const/locale';
import {
  LOBE_THEME_APPEARANCE,
  LOBE_THEME_NEUTRAL_COLOR,
  LOBE_THEME_PRIMARY_COLOR,
} from '@/const/theme';
import { locales } from '@/locales/resources';
import { getAntdLocale } from '@/utils/locale';

import AppTheme from './AppTheme';
import Locale from './Locale';
import QueryProvider from './Query';
import StyleRegistry from './StyleRegistry';

let DebugUI: FC = () => null;

// we need use Constant Folding to remove code below in production
// refs: https://webpack.js.org/plugins/internal-plugins/#constplugin
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line unicorn/no-lonely-if
}

const parserFallbackLang = () => {
  /**
   * The arguments are as follows:
   *
   * 1) The HTTP accept-language header.
   * 2) The available locales (they must contain the default locale).
   * 3) The default locale.
   */
  let fallbackLang: string = resolveAcceptLanguage(
    headers().get('accept-language') || '',
    //  Invalid locale identifier 'ar'. A valid locale should follow the BCP 47 'language-country' format.
    locales.map((locale) => locale),
    'en-US',
  );

  return fallbackLang;
};

const GlobalLayout = async ({ children }: PropsWithChildren) => {
  // get default theme config to use with ssr
  const cookieStore = cookies();
  const appearance = cookieStore.get(LOBE_THEME_APPEARANCE);
  const neutralColor = cookieStore.get(LOBE_THEME_NEUTRAL_COLOR);
  const primaryColor = cookieStore.get(LOBE_THEME_PRIMARY_COLOR);

  // get default locale config to use with ssr
  const defaultLang = cookieStore.get(LOBE_LOCALE_COOKIE);
  const fallbackLang = parserFallbackLang();

  // if it's a new user, there's no cookie
  // So we need to use the fallback language parsed by accept-language
  const userLocale = defaultLang?.value || fallbackLang;

  const antdLocale = await getAntdLocale(userLocale);

  return (
    <StyleRegistry>
      <Locale antdLocale={antdLocale} defaultLang={userLocale}>
        <AppTheme
          defaultAppearance={appearance?.value}
          defaultNeutralColor={neutralColor?.value as any}
          defaultPrimaryColor={primaryColor?.value as any}
        >
          <QueryProvider>{children}</QueryProvider>
          <DebugUI />
        </AppTheme>
      </Locale>
    </StyleRegistry>
  );
};

export default GlobalLayout;
