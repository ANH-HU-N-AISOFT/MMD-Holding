import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmployeeAccessStatus } from './constants/EmployeeAccessStatus';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getEmployeeAccessStatusMappingToLabels } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatusMappingToLabels';

interface Props {
  employeeAccessStatus?: EmployeeAccessStatus;
  onChange?: SelectSingleProps<EmployeeAccessStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectEmployeeAccessStatus = ({ employeeAccessStatus, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const employeeAccessStatusMappingToLabels = useMemo(() => {
    return getEmployeeAccessStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:employeeAccessStatus.label')}
      value={employeeAccessStatus}
      onChange={onChange}
      options={Object.values(EmployeeAccessStatus).map(item => {
        return {
          label: employeeAccessStatusMappingToLabels[item],
          searchValue: employeeAccessStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
