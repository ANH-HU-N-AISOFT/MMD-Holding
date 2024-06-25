import { TagProps } from 'reactjs';
import { EmployeeStatus } from '../models/EmployeeStatus';

export const EmployeeStatusMappingToColors: Record<EmployeeStatus, TagProps['color']> = {
  [EmployeeStatus.WORKING]: 'success',
  [EmployeeStatus.UNPAID_LEAVE]: 'processing',
  [EmployeeStatus.TERMINATED]: 'error',
  [EmployeeStatus.MATERNITY_LEAVE]: 'warning',
};
