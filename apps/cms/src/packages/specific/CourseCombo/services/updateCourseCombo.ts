import { CourseCombo } from '../models/CourseCombo';
import { CourseStatus } from '~/packages/specific/Course/models/CourseStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateCourseCombo {
  id: CourseCombo['id'];
  data: {
    id: string;
    name: string;
    courseRoadmapIds: string[];
    status: CourseStatus;
    notes: string | undefined | null;
  };
}

export interface ResponseSuccess {}

export const updateCourseCombo = async ({ data, id }: UpdateCourseCombo) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/course-combos/${id}`,
    data: data,
  });
  return response.data;
};
