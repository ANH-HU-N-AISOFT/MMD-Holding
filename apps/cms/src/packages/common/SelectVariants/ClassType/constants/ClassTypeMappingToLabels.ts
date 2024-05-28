import { TFunction } from 'i18next';
import { ClassType } from './ClassType';

export const getClassTypeMappingToLabels = (t: TFunction<['common', 'enum']>): Record<ClassType, string> => {
  return {
    [ClassType.AvailableClass]: t('enum:classType.options.AvailableClass'),
    [ClassType.PrivateClass]: t('enum:classType.options.PrivateClass'),
  };
};
