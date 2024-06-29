import { useTranslation } from 'react-i18next';
import { IconDocumentUploadLinear } from 'reactjs';

export const DraggerSingle = () => {
  const { t } = useTranslation(['components']);
  return (
    <div className="flex items-center gap-1">
      <IconDocumentUploadLinear className="text-lg" />
      {t('components:DraggerSingle.choose_file')}
    </div>
  );
};
