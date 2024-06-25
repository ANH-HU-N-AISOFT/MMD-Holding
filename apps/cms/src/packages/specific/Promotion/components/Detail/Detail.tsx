import { PromotionType } from '../../constants/PromotionType';
import { Promotion } from '../../models/Promotion';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  promotion: Promotion;
}

export const Detail = ({ promotion }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <FormMutation
          isSubmiting={false}
          uid=""
          disabled
          defaultValues={{
            code: promotion.code,
            departments: promotion.organizationIds,
            endDate: promotion.endDate,
            name: promotion.name,
            note: promotion.notes,
            promotionByGift: promotion.programType === PromotionType.Gift ? promotion.giftDiscount : undefined,
            promotionByMoney:
              promotion.programType === PromotionType.FeeDiscount
                ? promotion.feeDiscount
                : promotion.programType === PromotionType.PercentageDiscount
                  ? promotion.percentageDiscount
                  : 0,
            scope: promotion.scope,
            startDate: promotion.startDate,
            status: promotion.status,
            type: promotion.programType,
          }}
        />
      </div>
    </div>
  );
};
