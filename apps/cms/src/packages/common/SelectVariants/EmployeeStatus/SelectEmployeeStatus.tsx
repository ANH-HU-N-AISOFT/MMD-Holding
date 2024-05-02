import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmployeeStatus } from './constants/EmployeeStatus';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getEmployeeStatusMappingToLabels } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatusMappingToLabels';

interface Props {
  employeeStatus?: EmployeeStatus;
  onChange?: SelectSingleProps<EmployeeStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectEmployeeStatus = ({ employeeStatus, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);
  const employeeStatusMappingToLabels = useMemo(() => {
    return getEmployeeStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:workStatus.label')}
      value={employeeStatus}
      onChange={onChange}
      options={Object.values(EmployeeStatus).map(item => {
        return {
          label: employeeStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};