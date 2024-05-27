import { FormValues } from '../components/FormMutation/FormMutation';

export const calculateGiftPrice = ({
  displaySalePrice,
  calculateQuantityCourseRoadMap,
}: Pick<FormValues, 'calculateQuantityCourseRoadMap' | 'displaySalePrice'>) => {
  const quantityCourseRoadMap = calculateQuantityCourseRoadMap;
  if (!quantityCourseRoadMap || !displaySalePrice) {
    return undefined;
  }

  let extra = 0;
  if (displaySalePrice >= 10000000 && displaySalePrice < 15000000) {
    extra = 200000;
  } else if (displaySalePrice >= 15000000 && displaySalePrice < 25000000) {
    extra = 300000;
  } else if (displaySalePrice >= 25000000 && displaySalePrice < 40000000) {
    extra = 400000;
  } else if (displaySalePrice >= 40000000) {
    extra = 500000;
  }
  return quantityCourseRoadMap * 500000 + 1000000 + extra;
};
