import { TFunction } from 'i18next';
import { DemoType } from './DemoType';

export const getDemoTypeMappingToLabels = (t: TFunction<['common', 'enum']>): Record<DemoType, string> => {
  return {
    [DemoType.AvailableClass]: t('enum:demoType.options.AvailableClass'),
    [DemoType.PrivateClass]: t('enum:demoType.options.PrivateClass'),
  };
};
