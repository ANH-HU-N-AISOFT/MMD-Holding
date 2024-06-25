import { TFunction } from 'i18next';
import { TestType } from '../models/TestType';

export const getTestTypeMappingToLabels = (t: TFunction<['appointment']>): Record<TestType, string> => {
  return {
    [TestType.OFFLINE]: t('appointment:offline'),
    [TestType.ONLINE]: t('appointment:online'),
  };
};
