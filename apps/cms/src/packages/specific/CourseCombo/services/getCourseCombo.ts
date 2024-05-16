import { AxiosResponse } from 'axios';
import { CourseCombo } from '../models/CourseCombo';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = CourseCombo;

interface GetCourseCombo {
  id: CourseCombo['id'];
}

export const getCourseCombo = async ({ id }: GetCourseCombo) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/course-combos/${id}`,
  });
  return response.data;
};
