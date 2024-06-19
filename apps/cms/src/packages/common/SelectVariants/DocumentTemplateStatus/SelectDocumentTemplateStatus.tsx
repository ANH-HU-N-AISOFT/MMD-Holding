import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTemplateStatus } from './constants/DocumentTemplateStatus';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getDocumentTemplateStatusMappingToLabels } from '~/packages/common/SelectVariants/DocumentTemplateStatus/constants/DocumentTemplateStatusMappingToLabels';

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
  const { t } = useTranslation(['common', 'enum']);

  const documentTemplateStatusMappingToLabels = useMemo(() => {
    return getDocumentTemplateStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:document_template_status.label')}
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
