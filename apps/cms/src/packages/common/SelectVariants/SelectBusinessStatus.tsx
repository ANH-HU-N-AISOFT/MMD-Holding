import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getBusinessStatusMappingToLabels } from '~/packages/specific/Department/constants/BusinessStatusMappingToLabels';
import { BusinessStatusEnum } from '~/packages/specific/Department/models/Department';

interface Props {
  businessStatus?: BusinessStatusEnum;
  onChange?: SelectSingleProps<BusinessStatusEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectBusinessStatus = ({ businessStatus, disabled, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['common', 'department']);
  const businessStatusMappingToLabels = useMemo(() => {
    return getBusinessStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('department:status')}
      value={businessStatus}
      onChange={onChange}
      options={Object.values(BusinessStatusEnum).map(item => {
        return {
          label: businessStatusMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
