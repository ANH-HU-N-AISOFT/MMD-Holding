import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportCourseRoadmaps {
  query?: string;
  status?: string;
  courseId?: string;
}

export const exportCourseRoadmaps = async ({ query, status, courseId }: ExportCourseRoadmaps) => {
  const response = await fetchApi.request({
    url: '/course-roadmap/export',
    responseType: 'blob',
    params: {
      query,
      status,
      courseId,
    },
  });
  return response.data;
};
