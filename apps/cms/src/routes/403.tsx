import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useFetcher, useNavigate } from '@remix-run/react';
import { Button } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Page: FC = () => {
  const { t } = useTranslation(['page403']);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <div className="bg-gray-100 px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-status-red">403</h1>
        <p className="text-4xl font-medium text-gray-800">{t('page403:title')}</p>
        <p className="text-xl text-gray-800 my-4">{t('page403:title')}</p>
        <div className="grid grid-cols-2 gap-2">
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/')}>
            {t('page403:back_to_home')}
          </Button>
          <Button
            icon={<LogoutOutlined />}
            danger
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
