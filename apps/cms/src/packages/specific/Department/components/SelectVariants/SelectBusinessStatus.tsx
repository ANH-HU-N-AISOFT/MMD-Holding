import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getBusinessStatusMappingToLabels } from '../../constants/BusinessStatusMappingToLabels';
import { BusinessStatusEnum } from '../../models/BusinessStatusEnum';

interface Props {
  businessStatus?: BusinessStatusEnum;
  onChange?: SelectSingleProps<BusinessStatusEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectBusinessStatus = ({ businessStatus, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['department']);

  const businessStatusMappingToLabels = useMemo(() => {
    return getBusinessStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('department:business_status')}
      value={businessStatus}
      onChange={onChange}
      options={Object.values(BusinessStatusEnum).map(item => {
        return {
          label: businessStatusMappingToLabels[item],
          searchValue: businessStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
