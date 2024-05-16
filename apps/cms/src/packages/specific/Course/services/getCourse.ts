import { AxiosResponse } from 'axios';
import { Course } from '../models/Course';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = Course;

interface GetCourse {
  id: Course['id'];
}

export const getCourse = async ({ id }: GetCourse) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/courses/${id}`,
  });
  return response.data;
};
