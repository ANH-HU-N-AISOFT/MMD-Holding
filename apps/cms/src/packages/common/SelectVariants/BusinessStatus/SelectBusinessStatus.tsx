import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BusinessStatusEnum } from './constants/BusinessStatusEnum';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getBusinessStatusMappingToLabels } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusMappingToLabels';

interface Props {
  businessStatus?: BusinessStatusEnum;
  onChange?: SelectSingleProps<BusinessStatusEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectBusinessStatus = ({ businessStatus, disabled, allowClear, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const businessStatusMappingToLabels = useMemo(() => {
    return getBusinessStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:businessStatus.label')}
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
