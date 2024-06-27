import { AxiosResponse } from 'axios';
import { Employee } from '../models/Employee';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Employee[];
  headers: ServiceHeaderResponse;
}

export interface GetEmployeesInSelect {
  query?: string;
  managementOrganizationId?: string;
}
export const getEmployeesInSelect = async ({ managementOrganizationId, query }: GetEmployeesInSelect) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/employees/options',
    params: {
      query,
      managementOrganizationId,
    },
  });

  return response.data;
};
