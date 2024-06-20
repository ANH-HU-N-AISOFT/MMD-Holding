import { FormValues } from '../components/FormMutation/FormMutation';

export const calculateSalePrice = (data: Pick<FormValues, 'promotionType' | 'promotion' | 'originPrice'>) => {
  if (data.promotionType === 'percentage') {
    return data.originPrice * (1 - (data.promotion ?? 0) / 100);
  }
  return (data.originPrice ?? 0) - (data.promotion ?? 0);
};
