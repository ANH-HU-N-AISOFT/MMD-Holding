import { AxiosResponse } from 'axios';
import { CourseRoadmap } from '../models/CourseRoadmap';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = CourseRoadmap;

interface GetCourseRoadmap {
  id: CourseRoadmap['id'];
}

export const getCourseRoadmap = async ({ id }: GetCourseRoadmap) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/course-roadmap/${id}`,
  });
  return response.data;
};
