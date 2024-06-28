import { AxiosResponse } from 'axios';
import { Student } from '../models/Student';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Student[];
  total: number;
}

interface GetStudents {
  query?: string;
  page?: number;
  perPage?: number;
  orgCodes?: string[];
  sortByName?: -1 | 1;
  withoutPermission: boolean;
}
export const getStudents = async ({ page, query, perPage, orgCodes, sortByName, withoutPermission }: GetStudents) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/students',
    params: {
      page,
      query,
      perPage,
      orgCodes,
      sortByName,
      withoutPermission,
    },
  });

  return response.data;
};
