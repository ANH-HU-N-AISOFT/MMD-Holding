import { BusinessStatusEnum } from '../models/BusinessStatusEnum';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportDepartments {
  query?: string;
  businessStatus?: BusinessStatusEnum;
  withoutPermission: boolean;
}

export const exportDepartments = async ({ businessStatus, query, withoutPermission }: ExportDepartments) => {
  const response = await fetchApi.request({
    url: '/organizations/export',
    responseType: 'blob',
    params: {
      withoutPermission,
      businessStatus,
      query,
    },
  });
  return response.data;
};
