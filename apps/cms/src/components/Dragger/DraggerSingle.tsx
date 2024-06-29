import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const DraggerSingle = () => {
  const { t } = useTranslation(['components']);
  return (
    <div className="flex items-center gap-2">
      <UploadOutlined />
      {t('components:UploadSingle.choose_file')}
    </div>
  );
};
