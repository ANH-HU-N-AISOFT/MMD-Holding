import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { EmployeeContractType } from '../../models/EmployeeContractType';
import { getEmployeeContractTypeMappingToLabels } from '~/packages/specific/Employee/constants/EmployeeContractTypeMappingToLabels';

interface Props {
  employeeContractType?: EmployeeContractType;
  onChange?: SelectSingleProps<EmployeeContractType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectEmployeeContractType = ({ employeeContractType, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['enum']);

  const employeeContractTypeMappingToLabels = useMemo(() => {
    return getEmployeeContractTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:contractType.label')}
      value={employeeContractType}
      onChange={onChange}
      options={Object.values(EmployeeContractType).map(item => {
        return {
          label: employeeContractTypeMappingToLabels[item],
          searchValue: employeeContractTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
