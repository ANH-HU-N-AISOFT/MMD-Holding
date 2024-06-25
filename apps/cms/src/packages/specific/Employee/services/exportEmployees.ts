import { WorkStatus } from '../models/WorkStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportEmployees {
  query?: string;
  organizationId?: string;
  roles?: string;
  workStatus?: WorkStatus;
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
