import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getEmploymentContractTypeMappingToLabels } from '~/packages/specific/Employee/constants/EmploymentContractTypeMappingToLabels';
import { EmploymentContractType } from '~/packages/specific/Employee/models/Employee';

interface Props {
  employmentContractType?: EmploymentContractType;
  onChange?: SelectSingleProps<EmploymentContractType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectEmploymentContractType = ({ employmentContractType, disabled, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['common', 'employee']);
  const employmentContractTypeMappingToLabels = useMemo(() => {
    return getEmploymentContractTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('employee:employment_contract_type')}
      value={employmentContractType}
      onChange={onChange}
      options={Object.values(EmploymentContractType).map(item => {
        return {
          label: employmentContractTypeMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
