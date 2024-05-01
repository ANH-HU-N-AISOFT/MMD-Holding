import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getEmployeeAccessStatusMappingToLabels } from '~/packages/specific/Employee/constants/EmployeeAccessStatusMappingToLabels';
import { EmployeeAccessStatus } from '~/packages/specific/Employee/models/Employee';

interface Props {
  employeeAccessStatus?: EmployeeAccessStatus;
  onChange?: SelectSingleProps<EmployeeAccessStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectEmployeeAccessStatus = ({ employeeAccessStatus, disabled, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['common', 'employee']);
  const employeeAccessStatusMappingToLabels = useMemo(() => {
    return getEmployeeAccessStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('employee:employee_access_status')}
      value={employeeAccessStatus}
      onChange={onChange}
      options={Object.values(EmployeeAccessStatus).map(item => {
        return {
          label: employeeAccessStatusMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
