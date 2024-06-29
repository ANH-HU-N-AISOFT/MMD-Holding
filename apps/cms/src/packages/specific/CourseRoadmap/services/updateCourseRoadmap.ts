import { CourseRoadmap } from '../models/CourseRoadmap';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateCourseRoadmap {
  id: CourseRoadmap['id'];
  data: {
    id: string;
    name: string;
    code: string;
    courseId: string;
    numberSessions: number;
    sessionDuration: number;
    price: number;
    status: string;
    notes: string | null;
  };
}

export interface ResponseSuccess {}

export const updateCourseRoadmap = async ({ data, id }: UpdateCourseRoadmap) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/course-roadmap/${id}`,
    data: data,
  });
  return response.data;
};
