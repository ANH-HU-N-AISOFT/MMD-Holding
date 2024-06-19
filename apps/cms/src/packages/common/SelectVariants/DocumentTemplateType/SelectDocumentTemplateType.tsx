import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTemplateType } from './constants/DocumentTemplateType';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getDocumentTemplateTypeMappingToLabels } from '~/packages/common/SelectVariants/DocumentTemplateType/constants/DocumentTemplateTypeMappingToLabels';

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
  const { t } = useTranslation(['common', 'enum']);

  const documentTemplateTypeMappingToLabels = useMemo(() => {
    return getDocumentTemplateTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:document_template_type.label')}
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
