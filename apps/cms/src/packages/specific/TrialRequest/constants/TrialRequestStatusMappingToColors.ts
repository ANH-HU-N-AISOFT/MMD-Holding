import { TagProps } from 'reactjs';
import { TrialRequestStatus } from '../models/TrialRequestStatus';

export const TrialRequestStatusMappingToColors: Record<TrialRequestStatus, TagProps['color']> = {
  [TrialRequestStatus.Canceled]: 'error',
  [TrialRequestStatus.Assigned]: 'processing',
  [TrialRequestStatus.Completed]: 'success',
  [TrialRequestStatus.InProgress]: 'geekblue',
  [TrialRequestStatus.Awaiting]: 'warning',
};
