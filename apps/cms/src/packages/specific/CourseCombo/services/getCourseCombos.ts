import { AxiosResponse } from 'axios';
import { CourseCombo } from '../models/CourseCombo';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: CourseCombo[];
  headers: ServiceHeaderResponse;
}

interface GetCourseCombos {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;
  status?: string;
}
export const getCourseCombos = async ({ page, query, perPage, status, sortByName }: GetCourseCombos) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/course-combos',
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
