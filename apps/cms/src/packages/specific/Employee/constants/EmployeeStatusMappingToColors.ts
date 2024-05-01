import { TagProps } from 'antd';
import { EmployeeStatus } from '../models/Employee';

export const EmployeeStatusMappingToColors: Record<EmployeeStatus, TagProps['color']> = {
  [EmployeeStatus.WORKING]: 'success',
  [EmployeeStatus.UNPAID_LEAVE]: 'processing',
  [EmployeeStatus.TERMINATED]: 'error',
  [EmployeeStatus.MATERNITY_LEAVE]: 'warning',
};
