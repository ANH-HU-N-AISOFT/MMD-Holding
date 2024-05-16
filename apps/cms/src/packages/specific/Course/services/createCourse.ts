import { Course } from '../models/Course';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateCourse {
  name: string;
  status?: CourseStatus;
  notes?: string | null;
}

export type ResponseSuccess = Course;

export const createCourse = async (data: CreateCourse) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/courses',
    data: data,
  });
  return response.data;
};
