import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportDepartments {
  query?: string;
  businessStatus?: BusinessStatusEnum;
}

export const exportDepartments = async ({ businessStatus, query }: ExportDepartments) => {
  const response = await fetchApi.request({
    url: '/organizations/export',
    responseType: 'blob',
    params: {
      businessStatus,
      query,
    },
  });
  return response.data;
};
