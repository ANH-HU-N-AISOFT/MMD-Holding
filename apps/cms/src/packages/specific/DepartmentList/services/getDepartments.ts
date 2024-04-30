import { AxiosResponse } from 'axios';
import { BusinessStatusEnum, Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Department[];
  headers: {
    'x-page': number;
    'x-total-count': number;
    'x-pages-count': number;
    'x-per-page': number;
    'x-next-page': number;
  };
}

interface GetDepartments {
  query?: string;
  businessStatus?: BusinessStatusEnum;
  page?: number;
  perPage?: number;
  isManagementUnit?: boolean;
}
export const getDepartments = async ({ businessStatus, page, query, perPage, isManagementUnit }: GetDepartments) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/organizations',
    params: {
      businessStatus,
      page,
      query,
      perPage,
      isManagementUnit,
    },
  });

  return response.data;
};
