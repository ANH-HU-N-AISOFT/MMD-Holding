import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FormStatus } from './constants/FormStatus';
import { getFormStatusMappingToLabels } from './constants/FormStatusMappingToLabels';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';

interface Props {
  formStatus?: FormStatus;
  onChange?: SelectSingleProps<FormStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectFormStatus = ({ formStatus, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const FormStatusMappingToLabels = useMemo(() => {
    return getFormStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:formStatus.label')}
      value={formStatus}
      onChange={onChange}
      options={Object.values(FormStatus).map(item => {
        return {
          label: FormStatusMappingToLabels[item],
          searchValue: FormStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
