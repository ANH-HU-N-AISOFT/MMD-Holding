import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getDocumentTemplateStatusMappingToLabels } from '../../constants/DocumentTemplateStatusMappingToLabels';
import { DocumentTemplateStatus } from '../../models/DocumentTemplateStatus';

interface Props {
  documentTemplateStatus?: DocumentTemplateStatus;
  onChange?: SelectSingleProps<DocumentTemplateStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectDocumentTemplateStatus = ({
  documentTemplateStatus,
  disabled,
  allowClear = true,
  placeholder,
  onChange,
}: Props) => {
  const { t } = useTranslation(['document_template']);

  const documentTemplateStatusMappingToLabels = useMemo(() => {
    return getDocumentTemplateStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('document_template:status')}
      value={documentTemplateStatus}
      onChange={onChange}
      options={Object.values(DocumentTemplateStatus).map(item => {
        return {
          label: documentTemplateStatusMappingToLabels[item],
          searchValue: documentTemplateStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
