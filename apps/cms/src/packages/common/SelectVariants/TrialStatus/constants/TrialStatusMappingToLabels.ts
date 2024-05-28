import { TFunction } from 'i18next';
import { TrialStatus } from './TrialStatus';

export const getTrialStatusMappingToLabels = (t: TFunction<['common', 'enum']>): Record<TrialStatus, string> => {
  return {
    [TrialStatus.WaitingForClass]: t('enum:trialStatus.options.WaitingForClass'),
    [TrialStatus.ClassAssigned]: t('enum:trialStatus.options.ClassAssigned'),
    [TrialStatus.TrialClass]: t('enum:trialStatus.options.TrialClass'),
    [TrialStatus.Finished]: t('enum:trialStatus.options.Finished'),
    [TrialStatus.Cancelled]: t('enum:trialStatus.options.Finished'),
  };
};
