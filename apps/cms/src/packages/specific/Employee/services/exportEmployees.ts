import { EmployeeStatus } from '../models/EmployeeStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportEmployees {
  query?: string;
  organizationId?: string;
  roles?: string;
  workStatus?: EmployeeStatus;
}

export const exportEmployees = async ({ query, organizationId, roles, workStatus }: ExportEmployees) => {
  const response = await fetchApi.request({
    url: '/employees/export',
    responseType: 'blob',
    params: {
      query,
      organizationId,
      roles,
      workStatus,
    },
  });
  return response.data;
};
