import { AxiosResponse } from 'axios';
import { Student } from '../models/Student';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Student[];
  headers: ServiceHeaderResponse;
}

interface GetStudents {
  query?: string;
  page?: number;
  perPage?: number;
  orgCodes?: string;
  sortByName?: -1 | 1;
}
export const getStudents = async ({ page, query, perPage, orgCodes, sortByName }: GetStudents) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/students',
    params: {
      page,
      query,
      perPage,
      orgCodes,
      sortByName,
    },
  });

  return response.data;
};
