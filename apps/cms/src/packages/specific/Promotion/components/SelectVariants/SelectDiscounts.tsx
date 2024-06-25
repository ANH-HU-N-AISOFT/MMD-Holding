import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'reactjs';
import { SelectMultipleDecoupling, SelectMultipleDecouplingProps } from 'reactjs';
import { PromotionType } from '../../constants/PromotionType';
import { Promotion } from '../../models/Promotion';
import { PromotionStatus } from '../../models/PromotionStatus';
import { getPromotions } from '../../services/getPromotions';
import { GetAllParams } from '~/constants/GetAllParams';

interface Props {
  discounts?: Array<Promotion['id']>;
  onChange?: SelectMultipleDecouplingProps<Promotion, Array<Promotion['id']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  organizationId: 'GET_ALL' | string | undefined;
  emptyText?: string;
}

export const SelectDiscounts = ({
  disabled,
  discounts,
  allowClear = true,
  placeholder,
  onChange,
  organizationId,
  emptyText,
}: Props) => {
  const { t } = useTranslation(['promotion']);
  const needWarning = useMemo(() => !organizationId, [organizationId]);

  return (
    <SelectMultipleDecoupling
      depsFetch={[organizationId]}
      notFoundContent={needWarning && emptyText ? <Empty description={emptyText} /> : undefined}
      allowClear={allowClear}
      placeholder={placeholder ?? t('promotion:promotion')}
      disabled={disabled}
      value={discounts}
      onChange={onChange}
      service={async () => {
        const response = await getPromotions({
          ...GetAllParams,
          sortByName: 1,
          status: PromotionStatus.Active,
          promotionTypes: [PromotionType.FeeDiscount, PromotionType.PercentageDiscount].join(','),
          organizationId: organizationId === 'GET_ALL' ? undefined : organizationId,
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
