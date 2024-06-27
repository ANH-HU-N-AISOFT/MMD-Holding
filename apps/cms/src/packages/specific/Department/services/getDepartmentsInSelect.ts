import { AxiosResponse } from 'axios';
import { Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Department[];
  total: number;
}

export interface GetDepartmentsInSelect {
  query?: string;
  managementOrganizationId?: string;
}
export const getDepartmentsInSelect = async ({ query, managementOrganizationId }: GetDepartmentsInSelect) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/organizations',
    params: { query, managementOrganizationId },
  });

  return response.data;
};
