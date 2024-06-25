import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getPromotionStatusMappingToLabels } from '../../constants/PromotionStatusMappingToLabels';
import { PromotionStatus } from '../../models/PromotionStatus';

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
  const { t } = useTranslation(['promotion']);

  const PromotionStatusMappingToLabels = useMemo(() => {
    return getPromotionStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('promotion:promotion')}
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
