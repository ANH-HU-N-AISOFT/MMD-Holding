import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppointmentStatus } from './constants/AppointmentStatus';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getAppointmentStatusMappingToLabels } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatusMappingToLabels';

interface Props {
  appointmentStatus?: AppointmentStatus | 'all';
  onChange?: SelectSingleProps<AppointmentStatus>['onChange'];
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
  const { t } = useTranslation(['common', 'enum']);

  const appointmentStatusMappingToLabels = useMemo(() => {
    return getAppointmentStatusMappingToLabels(t);
  }, [t]);

  const options_ = useMemo(() => {
    const baseOptions = Object.values(AppointmentStatus).map(item => {
      return {
        label: appointmentStatusMappingToLabels[item],
        searchValue: appointmentStatusMappingToLabels[item],
        value: item,
        rawData: item,
      };
    });
    if (withAllOption) {
      return [{ value: 'all', label: t('enum:appointmentStatus.options.all'), rawData: undefined }].concat(
        ...(baseOptions as any[]),
      );
    }
    return baseOptions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, withAllOption]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:appointmentStatus.label')}
      value={appointmentStatus as any}
      onChange={onChange}
      options={options_}
    />
  );
};
