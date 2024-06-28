import { WorkStatus } from '../models/WorkStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportEmployees {
  query?: string;
  organizationIds?: string[];
  roles?: string[];
  workStatus?: WorkStatus;
  withoutPermission: boolean;
}

export const exportEmployees = async ({
  query,
  organizationIds,
  roles,
  workStatus,
  withoutPermission,
}: ExportEmployees) => {
  const response = await fetchApi.request({
    url: '/employees/export',
    responseType: 'blob',
    params: {
      query,
      organizationIds,
      roles,
      workStatus,
      withoutPermission,
    },
  });
  return response.data;
};
