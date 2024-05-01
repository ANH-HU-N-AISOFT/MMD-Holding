import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getEmployeeStatusMappingToLabels } from '~/packages/specific/Employee/constants/EmployeeStatusMappingToLabels';
import { EmployeeStatus } from '~/packages/specific/Employee/models/Employee';

interface Props {
  employeeStatus?: EmployeeStatus;
  onChange?: SelectSingleProps<EmployeeStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectEmployeeStatus = ({ employeeStatus, disabled, allowClear, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'employee']);
  const employeeStatusMappingToLabels = useMemo(() => {
    return getEmployeeStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('employee:work_status')}
      value={employeeStatus}
      onChange={onChange}
      options={Object.values(EmployeeStatus).map(item => {
        return {
          label: employeeStatusMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
