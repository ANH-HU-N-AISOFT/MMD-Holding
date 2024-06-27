import { AxiosResponse } from 'axios';
import { Student } from '../models/Student';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Student[];
  headers: ServiceHeaderResponse;
}

export interface GetStudentsInSelect {
  query?: string;
  managementOrganizationId?: string;
}
export const getStudentsInSelect = async ({ query, managementOrganizationId }: GetStudentsInSelect) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/students/options',
    params: {
      query,
      managementOrganizationId,
    },
  });

  return response.data;
};
