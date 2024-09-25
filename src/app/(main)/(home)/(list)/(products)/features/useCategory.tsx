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

import { AssistantCategory } from '@/types/discover';

import { ICON_SIZE } from '../../../components/CategoryMenu';

export const useCategory = (fontsize?: number) => {
  const theme = useTheme();

  const { t } = useTranslation('discover');

  const size = fontsize ? { fontSize: fontsize } : ICON_SIZE;

  return [
    {
      icon: <Icon color={theme.colorTextSecondary} icon={LayoutPanelTop} size={size} />,
      key: AssistantCategory.All,
      label: t('category.assistant.all'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={MicroscopeIcon} size={size} />,
      key: AssistantCategory.Academic,
      label: t('category.assistant.academic'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={BriefcaseIcon} size={size} />,
      key: AssistantCategory.Career,
      label: t('category.assistant.career'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={PencilIcon} size={size} />,
      key: AssistantCategory.CopyWriting,
      label: t('category.assistant.copywriting'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={ImageIcon} size={size} />,
      key: AssistantCategory.Design,
      label: t('category.assistant.design'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={GraduationCapIcon} size={size} />,
      key: AssistantCategory.Education,
      label: t('category.assistant.education'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={LaughIcon} size={size} />,
      key: AssistantCategory.Emotions,
      label: t('category.assistant.emotions'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={DramaIcon} size={size} />,
      key: AssistantCategory.Entertainment,
      label: t('category.assistant.entertainment'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={GamepadIcon} size={size} />,
      key: AssistantCategory.Games,
      label: t('category.assistant.games'),
    },
    {
      icon: <Icon color={theme.colorTextSecondary} icon={Layers} size={size} />,
      key: AssistantCategory.General,
      label: t('category.assistant.general'),
    },
  ];
};

export const useCategoryItem = (key?: AssistantCategory, fontsize?: number) => {
  const items = useCategory(fontsize);
  if (!key) return;
  return items.find((item) => item.key === key);
};
