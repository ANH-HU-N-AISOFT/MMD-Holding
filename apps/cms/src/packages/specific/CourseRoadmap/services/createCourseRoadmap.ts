import { CourseRoadmap } from '../models/CourseRoadmap';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateCourseRoadmap {
  name: string;
  code: string;
  courseId: string;
  numberSessions: number;
  sessionDuration: number;
  price: number;
  status: string;
  notes: string | null;
}

export type ResponseSuccess = CourseRoadmap;

export const createCourseRoadmap = async (data: CreateCourseRoadmap) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/course-roadmap',
    data: data,
  });
  return response.data;
};
