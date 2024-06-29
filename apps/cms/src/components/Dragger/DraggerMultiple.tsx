import { useTranslation } from 'react-i18next';
import { IconDocumentUploadLinear } from 'reactjs';

export const DraggerMultiple = () => {
  const { t } = useTranslation(['components']);
  return (
    <div>
      <p>
        <IconDocumentUploadLinear className="text-4xl" />
      </p>
      <div>{t('components:DraggerMultiple.title')}</div>
      <div>{t('components:DraggerMultiple.hint')}</div>
    </div>
  );
};
