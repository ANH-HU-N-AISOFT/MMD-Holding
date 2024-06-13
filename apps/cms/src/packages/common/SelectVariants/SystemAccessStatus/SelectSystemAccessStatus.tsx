import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SystemAccessStatus } from './constants/SystemAccessStatus';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getSystemAccessStatusMappingToLabels } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatusMappingToLabels';

interface Props {
  systemAccessStatus?: SystemAccessStatus;
  onChange?: SelectSingleProps<SystemAccessStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectSystemAccessStatus = ({ systemAccessStatus, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['enum']);

  const systemAccessStatusMappingToLabels = useMemo(() => {
    return getSystemAccessStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:systemAccessStatus.label')}
      value={systemAccessStatus}
      onChange={onChange}
      options={Object.values(SystemAccessStatus).map(item => {
        return {
          label: systemAccessStatusMappingToLabels[item],
          searchValue: systemAccessStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
