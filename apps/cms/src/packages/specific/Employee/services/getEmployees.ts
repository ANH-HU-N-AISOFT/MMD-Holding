import { AxiosResponse } from 'axios';
import { Employee } from '../models/Employee';
import { WorkStatus } from '../models/WorkStatus';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
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
  workStatus?: WorkStatus;
  sortByName?: 1 | -1;
}
export const getEmployees = async ({
  page,
  query,
  perPage,
  organizationId,
  roles,
  workStatus,
  sortByName,
}: GetEmployees) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/employees',
    params: {
      page,
      query,
      perPage,
      organizationId,
      roles,
      workStatus,
      sortByName,
    },
  });

  return response.data;
};
