import { TFunction } from 'i18next';
import { StudyMode } from '../models/StudyMode';

export const getStudyModeMappingToLabels = (t: TFunction<['trial_request']>): Record<StudyMode, string> => {
  return {
    [StudyMode.Offline]: t('trial_request:offline'),
    [StudyMode.Online]: t('trial_request:online'),
  };
};
