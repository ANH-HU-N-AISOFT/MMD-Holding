import { FormValues } from '../components/FormMutation/FormMutation';

export const calculateGiftPrice = ({
  calculateNDisplayOriginPrice,
  calculateQuantityCourseRoadMap,
}: Pick<FormValues, 'calculateQuantityCourseRoadMap' | 'calculateNDisplayOriginPrice'>) => {
  const quantityCourseRoadMap = calculateQuantityCourseRoadMap;
  const originPrice = calculateNDisplayOriginPrice;
  if (!quantityCourseRoadMap || !originPrice) {
    return undefined;
  }

  let extra = 0;
  if (originPrice >= 10000000 && originPrice < 15000000) {
    extra = 200000;
  } else if (originPrice >= 15000000 && originPrice < 25000000) {
    extra = 300000;
  } else if (originPrice >= 25000000 && originPrice < 40000000) {
    extra = 400000;
  } else if (originPrice >= 40000000) {
    extra = 500000;
  }
  return quantityCourseRoadMap * 500000 + 1000000 + extra;
};
