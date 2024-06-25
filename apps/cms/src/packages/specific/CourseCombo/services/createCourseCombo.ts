import { CourseCombo } from '../models/CourseCombo';
import { CourseStatus } from '~/packages/specific/Course/models/CourseStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateCourseCombo {
  name: string;
  courseRoadmapIds: string[];
  status: CourseStatus;
  notes: string | undefined | null;
}

export type ResponseSuccess = CourseCombo;

export const createCourseCombo = async (data: CreateCourseCombo) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/course-combos',
    data: data,
  });
  return response.data;
};
