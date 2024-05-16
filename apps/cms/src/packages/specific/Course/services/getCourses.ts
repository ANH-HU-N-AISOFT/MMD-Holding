import { AxiosResponse } from 'axios';
import { Course } from '../models/Course';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Course[];
  headers: ServiceHeaderResponse;
}

interface GetCourses {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;
  status?: string;
}
export const getCourses = async ({ page, query, perPage, status, sortByName }: GetCourses) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/courses',
    params: {
      page,
      query,
      perPage,
      status,
      sortByName,
    },
  });

  return response.data;
};
