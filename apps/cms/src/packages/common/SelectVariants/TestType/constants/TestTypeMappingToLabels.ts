import { TFunction } from 'i18next';
import { TestType } from './TestType';

export const getTestTypeMappingToLabels = (t: TFunction<['common', 'enum']>): Record<TestType, string> => {
  return {
    [TestType.OFFLINE]: t('enum:testType.options.offline'),
    [TestType.ONLINE]: t('enum:testType.options.online'),
  };
};
