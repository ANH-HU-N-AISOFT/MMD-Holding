import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { DocumentTemplateType } from '../../models/DocumentTemplateType';
import { getDocumentTemplateTypeMappingToLabels } from '~/packages/specific/DocumentTemplate/constants/DocumentTemplateTypeMappingToLabels';

interface Props {
  documentTemplateType?: DocumentTemplateType;
  onChange?: SelectSingleProps<DocumentTemplateType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectDocumentTemplateType = ({
  documentTemplateType,
  disabled,
  allowClear = true,
  placeholder,
  onChange,
}: Props) => {
  const { t } = useTranslation(['document_template']);

  const documentTemplateTypeMappingToLabels = useMemo(() => {
    return getDocumentTemplateTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('document_template:document_template_type')}
      value={documentTemplateType}
      onChange={onChange}
      options={Object.values(DocumentTemplateType).map(item => {
        return {
          label: documentTemplateTypeMappingToLabels[item],
          searchValue: documentTemplateTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
