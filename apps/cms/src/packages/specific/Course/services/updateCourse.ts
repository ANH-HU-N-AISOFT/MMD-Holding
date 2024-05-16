import { Course } from '../models/Course';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateCourse {
  id: Course['id'];
  data: {
    id: string;
    name: string;
    notes?: string | null;
    status?: CourseStatus;
  };
}

export interface ResponseSuccess {}

export const updateCourse = async ({ data, id }: UpdateCourse) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/courses/${id}`,
    data: data,
  });
  return response.data;
};
