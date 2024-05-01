import { AxiosResponse } from 'axios';
import { Employee, EmployeeStatus } from '../models/Employee';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Employee[];
  headers: {
    'x-page': number;
    'x-total-count': number;
    'x-pages-count': number;
    'x-per-page': number;
    'x-next-page': number;
  };
}

interface GetEmployees {
  query?: string;
  page?: number;
  perPage?: number;
  organizationId?: string;
  role?: string;
  workStatus?: EmployeeStatus;
}
export const getEmployees = async ({ page, query, perPage, organizationId, role, workStatus }: GetEmployees) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/employees',
    params: {
      page,
      query,
      perPage,
      organizationId,
      role,
      workStatus,
    },
  });

  return response.data;
};
