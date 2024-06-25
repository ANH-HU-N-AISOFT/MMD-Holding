import { TagProps } from 'reactjs';
import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';

export const BusinessStatusMappingToColors: Record<BusinessStatusEnum, TagProps['color']> = {
  [BusinessStatusEnum.ACTIVE]: 'success',
  [BusinessStatusEnum.COMING_SOON]: 'processing',
  [BusinessStatusEnum.PERMANENTLY_CLOSED]: 'error',
  [BusinessStatusEnum.TEMPORARILY_CLOSED]: 'warning',
};
