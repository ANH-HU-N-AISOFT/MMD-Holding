import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TrialStatus } from './constants/TrialStatus';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getTrialStatusMappingToLabels } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatusMappingToLabels';

interface Props {
  trialStatus?: TrialStatus;
  onChange?: SelectSingleProps<TrialStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectTrialStatus = ({ trialStatus, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const trialStatusMappingToLabels = useMemo(() => {
    return getTrialStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:trialStatus.label')}
      value={trialStatus}
      onChange={onChange}
      options={Object.values(TrialStatus).map(item => {
        return {
          label: trialStatusMappingToLabels[item],
          searchValue: trialStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
