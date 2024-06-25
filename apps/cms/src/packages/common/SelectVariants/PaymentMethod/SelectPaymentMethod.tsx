import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { PaymentMethod } from './constants/PaymentMethod';
import { getPaymentMethodMappingToLabels } from '~/packages/common/SelectVariants/PaymentMethod/constants/PaymentMethodMappingToLabels';

interface Props {
  paymentMethod?: PaymentMethod;
  onChange?: SelectSingleProps<PaymentMethod>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectPaymentMethod = ({ paymentMethod, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const paymentMethodMappingToLabels = useMemo(() => {
    return getPaymentMethodMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:paymentMethod.label')}
      value={paymentMethod}
      onChange={onChange}
      options={Object.values(PaymentMethod).map(item => {
        return {
          label: paymentMethodMappingToLabels[item],
          searchValue: paymentMethodMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
