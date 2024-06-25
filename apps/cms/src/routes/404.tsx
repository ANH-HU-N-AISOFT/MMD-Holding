import { HomeOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactjs';
import { useNavigate } from '~/overrides/remix';

export const Page: FC = () => {
  const { t } = useTranslation(['page404']);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 px-2 text-center">
      <div className="flex h-[100dvh] flex-col items-center justify-center">
        <h1 className="text-status-red text-8xl font-extrabold">404</h1>
        <p className="text-4xl font-medium text-gray-800">{t('page404:title')}</p>
        <p className="my-4 text-xl text-gray-800">{t('page404:description')}</p>
        <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/')}>
          {t('page404:back_to_home')}
        </Button>
      </div>
    </div>
  );
};

export default Page;
