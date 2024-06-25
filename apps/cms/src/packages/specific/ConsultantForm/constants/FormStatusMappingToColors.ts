import { TagProps } from 'reactjs';
import { FormStatus } from '../models/FormStatus';

export const FormStatusMappingToColors: Record<FormStatus, TagProps['color']> = {
  [FormStatus.Consulted]: 'success',
  [FormStatus.UnderCare]: 'processing',
  [FormStatus.Trial]: 'default',
  [FormStatus.SalesClosed]: 'volcano',
  [FormStatus.Failed]: 'error',
};
