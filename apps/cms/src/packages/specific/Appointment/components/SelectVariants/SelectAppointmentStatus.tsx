import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectOption, SelectSingleProps } from 'reactjs';
import { getAppointmentStatusMappingToLabels } from '../../constants/AppointmentStatusMappingToLabels';
import { AppointmentStatus } from '../../models/AppointmentStatus';

type ValueType = AppointmentStatus | 'all';
interface Props {
  appointmentStatus?: ValueType;
  onChange?: SelectSingleProps<ValueType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  withAllOption?: boolean;
}

export const SelectAppointmentStatus = ({
  appointmentStatus,
  disabled,
  allowClear = true,
  placeholder,
  onChange,
  withAllOption = false,
}: Props) => {
  const { t } = useTranslation(['appointment', 'common']);

  const appointmentStatusMappingToLabels = useMemo(() => {
    return getAppointmentStatusMappingToLabels(t);
  }, [t]);

  const options_: SelectOption<ValueType, AppointmentStatus | undefined>[] = useMemo(() => {
    const baseOptions = Object.values(AppointmentStatus).map(item => {
      return {
        label: appointmentStatusMappingToLabels[item],
        searchValue: appointmentStatusMappingToLabels[item],
        value: item,
        rawData: item,
      };
    });
    if (withAllOption) {
      return [{ value: 'all', label: t('appointment:all_status'), rawData: undefined } as const, ...baseOptions];
    }
    return baseOptions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, withAllOption]);

  return (
    <SelectSingle<ValueType>
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('appointment:appointment_status')}
      value={appointmentStatus}
      onChange={onChange}
      options={options_}
    />
  );
};
