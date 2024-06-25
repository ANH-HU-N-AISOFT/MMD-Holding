import { TagProps } from 'reactjs';
import { WorkStatus } from '../models/WorkStatus';

export const WorkStatusMappingToColors: Record<WorkStatus, TagProps['color']> = {
  [WorkStatus.WORKING]: 'success',
  [WorkStatus.UNPAID_LEAVE]: 'processing',
  [WorkStatus.TERMINATED]: 'error',
  [WorkStatus.MATERNITY_LEAVE]: 'warning',
};
