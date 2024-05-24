import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PromotionStatus } from './constants/PromotionStatus';
import { getPromotionStatusMappingToLabels } from './constants/PromotionStatusMappingToLabels';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';

interface Props {
  promotionStatus?: PromotionStatus;
  onChange?: SelectSingleProps<PromotionStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectPromotionStatus = ({
  promotionStatus,
  disabled,
  allowClear = true,
  placeholder,
  onChange,
}: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const PromotionStatusMappingToLabels = useMemo(() => {
    return getPromotionStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:promotionStatus.label')}
      value={promotionStatus}
      onChange={onChange}
      options={Object.values(PromotionStatus).map(item => {
        return {
          label: PromotionStatusMappingToLabels[item],
          searchValue: PromotionStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
