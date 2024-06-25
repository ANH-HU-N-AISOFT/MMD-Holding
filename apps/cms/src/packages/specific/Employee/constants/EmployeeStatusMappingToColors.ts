import { TagProps } from 'reactjs';
import { EmployeeStatus } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatus';

export const EmployeeStatusMappingToColors: Record<EmployeeStatus, TagProps['color']> = {
  [EmployeeStatus.WORKING]: 'success',
  [EmployeeStatus.UNPAID_LEAVE]: 'processing',
  [EmployeeStatus.TERMINATED]: 'error',
  [EmployeeStatus.MATERNITY_LEAVE]: 'warning',
};
