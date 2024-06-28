import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { IconUserLinear } from 'reactjs';
import { useFetcher } from '~/overrides/remix';

export const useGetAvatarDropdown = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const fetcher = useFetcher();

  const items = [
    { key: '1', label: t('dashboard_layout:profile'), icon: <IconUserLinear className="!text-lg" /> },
    {
      key: '2',
      label: t('dashboard_layout:logout'),
      icon: <LogoutOutlined className="!text-base" />,
      danger: true,
      onClick: () => {
        fetcher.submit({}, { method: 'POST', action: '/logout' });
      },
    },
  ];
  return items;
};
