import { TagProps } from 'antd';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';

export const FormStatusMappingToColors: Record<FormStatus, TagProps['color']> = {
  [FormStatus.Consulted]: 'success',
  [FormStatus.Failed]: 'error',
  [FormStatus.UnderCare]: 'processing',
  [FormStatus.SalesClosed]: 'volcano',
};
