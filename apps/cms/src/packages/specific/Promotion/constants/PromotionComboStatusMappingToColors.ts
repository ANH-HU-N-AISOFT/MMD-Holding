import { TagProps } from 'antd';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';

export const PromotionStatusMappingToColors: Record<PromotionStatus, TagProps['color']> = {
  [PromotionStatus.Active]: 'success',
  [PromotionStatus.InActive]: 'error',
};
