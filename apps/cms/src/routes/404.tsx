import { HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '~/overrides/@remix';

export const Page: FC = () => {
  const { t } = useTranslation(['page404']);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 px-2 text-center">
      <div className="h-[100dvh] flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-status-red">404</h1>
        <p className="text-4xl font-medium text-gray-800">{t('page404:title')}</p>
        <p className="text-xl text-gray-800 my-4">{t('page404:description')}</p>
        <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/')}>
          {t('page404:back_to_home')}
        </Button>
      </div>
    </div>
  );
};

export default Page;
