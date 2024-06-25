import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getWorkStatusMappingToLabels } from '../../constants/WorkStatusMappingToLabels';
import { WorkStatus } from '../../models/WorkStatus';

interface Props {
  employeeStatus?: WorkStatus;
  onChange?: SelectSingleProps<WorkStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectEmployeeStatus = ({ employeeStatus, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['employee']);

  const employeeStatusMappingToLabels = useMemo(() => {
    return getWorkStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('employee:work_status')}
      value={employeeStatus}
      onChange={onChange}
      options={Object.values(WorkStatus).map(item => {
        return {
          label: employeeStatusMappingToLabels[item],
          searchValue: employeeStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
