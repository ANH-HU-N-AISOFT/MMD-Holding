import { zodResolver } from '@hookform/resolvers/zod';
import { array, literal, number, object, string, enum as enum_ } from 'zod';
import type { TFunction } from 'i18next';
import { PromotionScope } from '~/packages/common/SelectVariants/PromotionScope/constants/PromotionScope';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'promotion']>) => {
  const name = {
    required: getRequiredMessage(t, 'promotion:name'),
    length: getRangeLengthMessage(t, 'promotion:name', 3, 64),
  };
  const code = {
    required: getRequiredMessage(t, 'promotion:code'),
    length: getRangeLengthMessage(t, 'promotion:code', 1, 8),
  };
  const dateAvailable = {
    required: getRequiredMessageSelectField(t, 'promotion:date_available'),
  };
  const departments = {
    required: getRequiredMessageSelectField(t, 'promotion:department'),
  };
  const promotion2 = {
    required: getRequiredMessage(t, 'promotion:promotion2'),
  };
  const note = {
    length: getRangeLengthMessage(t, 'promotion:note', 0, 256),
  };

  return object({
    name: string({ required_error: name.required }).trim().min(3, name.length).max(64, name.length),
    code: string({ required_error: code.required }).trim().min(1, code.length).max(64, code.length),
    status: enum_([PromotionStatus.Active, PromotionStatus.InActive]),
    startDate: string({ required_error: dateAvailable.required }),
    endDate: string({ required_error: dateAvailable.required }),
    type: enum_([PromotionType.FeeDiscount, PromotionType.Gift, PromotionType.PercentageDiscount]),
    promotionByMoney: number({ required_error: promotion2.required }),
    promotionByGift: string({ required_error: promotion2.required }).optional(),
    scope: enum_([PromotionScope.All, PromotionScope.Special]),
    departments: array(string()).optional(),
    note: string().trim().min(0, note.length).max(256, note.length).trim().optional().or(literal('')).nullable(),
  })
    .refine(
      data => {
        if (data.type === PromotionType.Gift) {
          return data.promotionByGift?.length;
        }
        return true;
      },
      {
        message: promotion2.required,
        path: ['promotionByGift'],
      },
    )
    .refine(
      data => {
        if (data.scope === PromotionScope.Special) {
          return data.departments?.length;
        }
        return true;
      },
      {
        message: departments.required,
        path: ['departments'],
      },
    );
};

export const getFormMutationResolver = (t: TFunction<['common', 'promotion']>) => {
  return zodResolver(getFormMutationSchema(t));
};
