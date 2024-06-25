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
}
export const getDepartments = async ({
  businessStatus,
  page,
  query,
  perPage,
  isManagementUnit,
  sortByName,
  parentOrganizationId,
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
    },
  });

  return response.data;
};
