import { ActionIcon } from '@lobehub/ui';
import { Popover, type PopoverProps } from 'antd';
import { useTheme } from 'antd-style';
import { Languages } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Menu, { type MenuProps } from '@/components/Menu';
import { localeOptions } from '@/locales/resources';
import { switchLang } from '@/utils/client/switchLang';

const LangButton = memo<{ placement?: PopoverProps['placement'] }>(({ placement = 'right' }) => {
  const theme = useTheme();

  const { t } = useTranslation('setting');

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'auto',
        label: t('settingTheme.lang.autoMode'),
        onClick: () => switchLang('auto'),
      },
      ...localeOptions.map((item) => ({
        key: item.value,
        label: item.label,
        onClick: () => switchLang(item.value),
      })),
    ],
    [t],
  );

  return (
    <Popover
      arrow={false}
      content={<Menu items={items} selectable />}
      overlayInnerStyle={{
        padding: 0,
      }}
      placement={placement}
      trigger={['click', 'hover']}
    >
      <ActionIcon
        icon={Languages}
        size={{ blockSize: 32, fontSize: 16 }}
        style={{ border: `1px solid ${theme.colorFillSecondary}` }}
      />
    </Popover>
  );
});

export default LangButton;
