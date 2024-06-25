import { TagProps } from 'reactjs';
import { BusinessStatusEnum } from '../models/BusinessStatusEnum';

export const BusinessStatusMappingToColors: Record<BusinessStatusEnum, TagProps['color']> = {
  [BusinessStatusEnum.ACTIVE]: 'success',
  [BusinessStatusEnum.COMING_SOON]: 'processing',
  [BusinessStatusEnum.PERMANENTLY_CLOSED]: 'error',
  [BusinessStatusEnum.TEMPORARILY_CLOSED]: 'warning',
};
