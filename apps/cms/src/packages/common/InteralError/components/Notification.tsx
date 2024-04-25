import { HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { localStorage } from 'utilities';
import { KeyOfErrorCodeInCookie } from '../constants/KeyOfErrorCodeInCookie';
import { useNavigate } from '~/overrides/@remix';

// TODO: Hiển thị reason
export const Notification = () => {
  const { t } = useTranslation(['page500']);
  const navigate = useNavigate();

  useEffect(() => {
    const reason = localStorage.getItem(KeyOfErrorCodeInCookie);
    console.log(reason);
  }, []);

  return (
    <div className="bg-gray-100 px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-status-red">500</h1>
        <p className="text-4xl font-medium text-gray-800">{t('page500:title')}</p>
        <p className="text-xl text-gray-800 my-4">{t('page500:description')}</p>
        <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/')}>
          {t('page500:back_to_home')}
        </Button>
      </div>
    </div>
  );
};

export const InteralError = {
  setError: (reason: any) => {
    localStorage.setItem(KeyOfErrorCodeInCookie, JSON.stringify(reason));
  },
};
