import { TagProps } from 'reactjs';
import { PromotionStatus } from '../models/PromotionStatus';

export const PromotionStatusMappingToColors: Record<PromotionStatus, TagProps['color']> = {
  [PromotionStatus.Active]: 'success',
  [PromotionStatus.InActive]: 'error',
};
