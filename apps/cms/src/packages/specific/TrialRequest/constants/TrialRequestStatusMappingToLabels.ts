import { TFunction } from 'i18next';
import { TrialRequestStatus } from '../models/TrialRequestStatus';

export const getTrialRequestStatusMappingToLabels = (
  t: TFunction<['common', 'enum']>,
): Record<TrialRequestStatus, string> => {
  return {
    [TrialRequestStatus.Assigned]: t('enum:trialRequestStatus.options.Assigned'),
    [TrialRequestStatus.Awaiting]: t('enum:trialRequestStatus.options.Awaiting'),
    [TrialRequestStatus.InProgress]: t('enum:trialRequestStatus.options.InProgress'),
    [TrialRequestStatus.Completed]: t('enum:trialRequestStatus.options.Completed'),
    [TrialRequestStatus.Canceled]: t('enum:trialRequestStatus.options.Cancelled'),
  };
};
