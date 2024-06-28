import { AxiosResponse } from 'axios';
import { BusinessStatusEnum } from '../models/BusinessStatusEnum';
import { Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Department[];
  total: number;
}

interface GetDepartments {
  query?: string;
  businessStatus?: BusinessStatusEnum;
  page?: number;
  perPage?: number;
  isManagementUnit?: boolean;
  sortByName?: 1 | -1;
  parentOrganizationId?: string;
  withoutPermission: boolean;
}
export const getDepartments = async ({
  businessStatus,
  page,
  query,
  perPage,
  isManagementUnit,
  sortByName,
  parentOrganizationId,
  withoutPermission,
}: GetDepartments) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/organizations',
    params: {
      businessStatus,
      page,
      query,
      perPage,
      isManagementUnit,
      sortByName,
      parentOrganizationId,
      withoutPermission,
    },
  });

  return response.data;
};
