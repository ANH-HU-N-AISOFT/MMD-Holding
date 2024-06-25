import { TFunction } from 'i18next';
import { TrialRequestStatus } from '../models/TrialRequestStatus';

export const getTrialRequestStatusMappingToLabels = (
  t: TFunction<['trial_request']>,
): Record<TrialRequestStatus, string> => {
  return {
    [TrialRequestStatus.Assigned]: t('trial_request:Assigned'),
    [TrialRequestStatus.Awaiting]: t('trial_request:Awaiting'),
    [TrialRequestStatus.InProgress]: t('trial_request:InProgress'),
    [TrialRequestStatus.Completed]: t('trial_request:Completed'),
    [TrialRequestStatus.Canceled]: t('trial_request:Cancelled'),
  };
};
