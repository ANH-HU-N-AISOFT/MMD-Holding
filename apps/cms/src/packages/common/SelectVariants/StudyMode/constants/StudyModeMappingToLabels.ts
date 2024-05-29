import { TFunction } from 'i18next';
import { StudyMode } from './StudyMode';

export const getStudyModeMappingToLabels = (t: TFunction<['common', 'enum']>): Record<StudyMode, string> => {
  return {
    [StudyMode.Offline]: t('enum:studyMode.options.offline'),
    [StudyMode.Online]: t('enum:studyMode.options.online'),
  };
};
