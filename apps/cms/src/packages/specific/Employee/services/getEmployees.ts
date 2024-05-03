import { AxiosResponse } from 'axios';
import { Employee } from '../models/Employee';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { EmployeeStatus } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Employee[];
  headers: ServiceHeaderResponse;
}

interface GetEmployees {
  query?: string;
  page?: number;
  perPage?: number;
  organizationId?: string;
  roles?: string;
  workStatus?: EmployeeStatus;
}
export const getEmployees = async ({ page, query, perPage, organizationId, roles, workStatus }: GetEmployees) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/employees',
    params: {
      page,
      query,
      perPage,
      organizationId,
      roles,
      workStatus,
    },
  });

  return response.data;
};
