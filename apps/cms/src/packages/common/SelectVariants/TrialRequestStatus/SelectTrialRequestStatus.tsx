import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TrialRequestStatus } from './constants/TrialRequestStatus';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getTrialRequestStatusMappingToLabels } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatusMappingToLabels';

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
  const { t } = useTranslation(['common', 'enum']);

  const trialRequestStatusMappingToLabels = useMemo(() => {
    return getTrialRequestStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:trialRequestStatus.label')}
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
