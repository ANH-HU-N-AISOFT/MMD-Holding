import { AxiosResponse } from 'axios';
import { CourseRoadmap } from '../models/CourseRoadmap';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: CourseRoadmap[];
  headers: ServiceHeaderResponse;
}

interface GetCourseRoadmaps {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;
  status?: string;
  courseId?: string;
}
export const getCourseRoadmaps = async ({ page, query, perPage, status, sortByName, courseId }: GetCourseRoadmaps) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/course-roadmap',
    params: {
      page,
      query,
      perPage,
      status,
      sortByName,
      courseId,
    },
  });

  return response.data;
};
