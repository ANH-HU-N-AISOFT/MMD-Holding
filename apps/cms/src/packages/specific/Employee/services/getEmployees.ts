import { AxiosResponse } from 'axios';
import { Employee } from '../models/Employee';
import { WorkStatus } from '../models/WorkStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Employee[];
  total: number;
}

interface GetEmployees {
  query?: string;
  page?: number;
  perPage?: number;
  organizationIds?: string[];
  roles?: string[];
  workStatus?: WorkStatus;
  sortByName?: 1 | -1;
  withoutPermission: boolean;
}
export const getEmployees = async ({
  page,
  query,
  perPage,
  organizationIds,
  roles,
  workStatus,
  sortByName,
  withoutPermission,
}: GetEmployees) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/employees',
    params: {
      page,
      query,
      perPage,
      organizationIds,
      roles,
      workStatus,
      sortByName,
      withoutPermission,
    },
  });

  return response.data;
};
