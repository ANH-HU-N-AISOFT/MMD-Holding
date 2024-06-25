import { PromotionType } from '../../constants/PromotionType';
import { Promotion } from '../../models/Promotion';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  promotion: Promotion;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ promotion, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      isEdit
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
  );
};
