import { Course } from '../models/Course';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteCourse {
  id: Course['id'];
}

export const deleteCourse = async ({ id }: DeleteCourse) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/courses/${id}`,
  });
  return response.data;
};
