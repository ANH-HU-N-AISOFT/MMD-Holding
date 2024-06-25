import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactjs';
import { useFetcher, useNavigate } from '~/overrides/remix';

export const Page: FC = () => {
  const { t } = useTranslation(['page403']);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <div className="bg-gray-100 px-2 text-center">
      <div className="flex h-[100dvh] flex-col items-center justify-center">
        <h1 className="text-status-red text-8xl font-extrabold">403</h1>
        <p className="text-4xl font-medium text-gray-800">{t('page403:title')}</p>
        <p className="my-4 text-xl text-gray-800">{t('page403:description')}</p>
        <div className="grid grid-cols-2 gap-2">
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/')}>
            {t('page403:back_to_home')}
          </Button>
          <Button
            icon={<LogoutOutlined />}
            color="error"
            ghost
            onClick={() => {
              fetcher.submit({}, { method: 'POST', action: '/logout' });
            }}
          >
            {t('page403:logout')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
