import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getTrialRequestStatusMappingToLabels } from '../../constants/TrialRequestStatusMappingToLabels';
import { TrialRequestStatus } from '../../models/TrialRequestStatus';

interface Props {
  trialRequestStatus?: TrialRequestStatus;
  onChange?: SelectSingleProps<TrialRequestStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectTrialRequestStatus = ({
  trialRequestStatus,
  disabled,
  allowClear = true,
  placeholder,
  onChange,
}: Props) => {
  const { t } = useTranslation(['trial_request']);

  const trialRequestStatusMappingToLabels = useMemo(() => {
    return getTrialRequestStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('trial_request:status')}
      value={trialRequestStatus}
      onChange={onChange}
      options={Object.values(TrialRequestStatus).map(item => {
        return {
          label: trialRequestStatusMappingToLabels[item],
          searchValue: trialRequestStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
