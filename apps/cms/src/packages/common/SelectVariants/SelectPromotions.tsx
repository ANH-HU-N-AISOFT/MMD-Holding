import { useTranslation } from 'react-i18next';
import { PromotionStatus } from './PromotionStatus/constants/PromotionStatus';
import {
  SelectMultipleDecoupling,
  SelectMultipleDecouplingProps,
} from '~/components/SelectDecoupling/SelectMultipleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Promotion } from '~/packages/specific/Promotion/models/Promotion';
import { getPromotions } from '~/packages/specific/Promotion/services/getPromotions';

interface Props {
  promotions?: Array<Promotion['id']>;
  onChange?: SelectMultipleDecouplingProps<Promotion, Array<Promotion['id']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectPromotions = ({ disabled, promotions, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['promotion']);

  return (
    <SelectMultipleDecoupling
      allowClear={allowClear}
      placeholder={placeholder ?? t('promotion:promotion')}
      disabled={disabled}
      value={promotions}
      onChange={onChange}
      service={async () => {
        const response = await getPromotions({
          ...GetAllParams,
          sortByName: 1,
          status: PromotionStatus.Active,
        });
        return response.items;
      }}
      transformToOption={promotion => {
        return {
          label: promotion.name,
          searchValue: promotion.name,
          value: promotion.id,
          rawData: promotion,
        };
      }}
      className="w-full"
    />
  );
};
