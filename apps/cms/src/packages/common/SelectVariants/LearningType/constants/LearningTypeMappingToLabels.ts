import { TFunction } from 'i18next';
import { LearningType } from './LearningType';

export const getLearningTypeMappingToLabels = (t: TFunction<['common', 'enum']>): Record<LearningType, string> => {
  return {
    [LearningType.OFFLINE]: t('enum:learningType.options.offline'),
    [LearningType.ONLINE]: t('enum:learningType.options.online'),
  };
};
