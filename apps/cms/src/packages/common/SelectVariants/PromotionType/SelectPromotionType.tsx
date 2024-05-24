import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PromotionType } from './constants/PromotionType';
import { getPromotionTypeMappingToLabels } from './constants/PromotionTypeMappingToLabels';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';

interface Props {
  promotionType?: PromotionType;
  onChange?: SelectSingleProps<PromotionType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectPromotionType = ({ promotionType, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const PromotionTypeMappingToLabels = useMemo(() => {
    return getPromotionTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:promotionType.label')}
      value={promotionType}
      onChange={onChange}
      options={Object.values(PromotionType).map(item => {
        return {
          label: PromotionTypeMappingToLabels[item],
          searchValue: PromotionTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
