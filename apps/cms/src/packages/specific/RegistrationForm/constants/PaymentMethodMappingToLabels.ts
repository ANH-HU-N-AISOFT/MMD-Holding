import { TFunction } from 'i18next';
import { PaymentMethod } from '../models/PaymentMethod';

export const getPaymentMethodMappingToLabels = (t: TFunction<['registration_form']>): Record<PaymentMethod, string> => {
  return {
    [PaymentMethod.BANK]: t('registration_form:BANK'),
    [PaymentMethod.CASH]: t('registration_form:CASH'),
    [PaymentMethod.POS]: t('registration_form:POS'),
  };
};
