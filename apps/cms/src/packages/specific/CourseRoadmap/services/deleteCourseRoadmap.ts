import { CourseRoadmap } from '../models/CourseRoadmap';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteCourseRoadmap {
  id: CourseRoadmap['id'];
}

export const deleteCourseRoadmap = async ({ id }: DeleteCourseRoadmap) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/course-roadmap/${id}`,
  });
  return response.data;
};
