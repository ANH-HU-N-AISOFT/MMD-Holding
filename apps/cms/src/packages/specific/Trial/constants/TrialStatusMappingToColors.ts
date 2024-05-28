import { TagProps } from 'antd';
import { TrialStatus } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatus';

export const TrialStatusMappingToColors: Record<TrialStatus, TagProps['color']> = {
  [TrialStatus.Cancelled]: 'error',
  [TrialStatus.ClassAssigned]: 'processing',
  [TrialStatus.Finished]: 'success',
  [TrialStatus.TrialClass]: 'geekbluel;',
  [TrialStatus.WaitingForClass]: 'warning',
};
