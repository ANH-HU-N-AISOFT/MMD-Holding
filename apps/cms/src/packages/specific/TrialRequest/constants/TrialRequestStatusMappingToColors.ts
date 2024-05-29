import { TagProps } from 'antd';
import { TrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatus';

export const TrialRequestStatusMappingToColors: Record<TrialRequestStatus, TagProps['color']> = {
  [TrialRequestStatus.Canceled]: 'error',
  [TrialRequestStatus.Assigned]: 'processing',
  [TrialRequestStatus.Completed]: 'success',
  [TrialRequestStatus.InProgress]: 'geekblue',
  [TrialRequestStatus.Awaiting]: 'warning',
};
