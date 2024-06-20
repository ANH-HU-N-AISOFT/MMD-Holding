import { TFunction } from 'i18next';
import { PaymentMethod } from './PaymentMethod';

export const getPaymentMethodMappingToLabels = (t: TFunction<['common', 'enum']>): Record<PaymentMethod, string> => {
  return {
    [PaymentMethod.BANK]: t('enum:paymentMethod.options.BANK'),
    [PaymentMethod.CASH]: t('enum:paymentMethod.options.CASH'),
    [PaymentMethod.POS]: t('enum:paymentMethod.options.POS'),
  };
};
