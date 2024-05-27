import { TagProps } from 'antd';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';

export const FormStatusMappingToColors: Record<FormStatus, TagProps['color']> = {
  [FormStatus.Consulted]: 'success',
  [FormStatus.UnderCare]: 'processing',
  [FormStatus.Trial]: 'default',
  [FormStatus.SalesClosed]: 'volcano',
  [FormStatus.Failed]: 'error',
};
