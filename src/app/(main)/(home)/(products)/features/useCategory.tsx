import { Icon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import {
  BriefcaseIcon,
  DramaIcon,
  GamepadIcon,
  GraduationCapIcon,
  ImageIcon,
  LaughIcon,
  Layers,
  LayoutPanelTop,
  MicroscopeIcon,
  PencilIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ProductCategory } from '@/types/discover';

import { ICON_SIZE } from '../../components/CategoryMenu';

export const useCategory = (fontsize?: number) => {
  const theme = useTheme();

  const { t } = useTranslation('discover');

  const size = fontsize ? { fontSize: fontsize } : ICON_SIZE;

  return [
    {
      icon: <Icon color={theme.colorTextSecondary} icon={LayoutPanelTop} size={size} />,
      key: ProductCategory.All,
      label: t('category.assistant.all'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={MicroscopeIcon} size={size} />,
      key: ProductCategory.Academic,
      label: t('category.assistant.academic'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={BriefcaseIcon} size={size} />,
      key: ProductCategory.Career,
      label: t('category.assistant.career'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={PencilIcon} size={size} />,
      key: ProductCategory.CopyWriting,
      label: t('category.assistant.copywriting'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={ImageIcon} size={size} />,
      key: ProductCategory.Design,
      label: t('category.assistant.design'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={GraduationCapIcon} size={size} />,
      key: ProductCategory.Education,
      label: t('category.assistant.education'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={LaughIcon} size={size} />,
      key: ProductCategory.Emotions,
      label: t('category.assistant.emotions'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={DramaIcon} size={size} />,
      key: ProductCategory.Entertainment,
      label: t('category.assistant.entertainment'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={GamepadIcon} size={size} />,
      key: ProductCategory.Games,
      label: t('category.assistant.games'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={Layers} size={size} />,
      key: ProductCategory.General,
      label: t('category.assistant.general'),
    },
  ];
};

export const useCategoryItem = (key?: ProductCategory, fontsize?: number) => {
  const items = useCategory(fontsize);
  if (!key) return;
  return items.find((item) => item.key === key);
};
