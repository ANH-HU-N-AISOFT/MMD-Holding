import { CourseCombo } from '../models/CourseCombo';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteCourseCombo {
  id: CourseCombo['id'];
}

export const deleteCourseCombo = async ({ id }: DeleteCourseCombo) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/course-combos/${id}`,
  });
  return response.data;
};
