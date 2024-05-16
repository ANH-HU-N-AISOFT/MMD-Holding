import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportCourses {
  query?: string;
  status?: string;
}

export const exportCourses = async ({ query, status }: ExportCourses) => {
  const response = await fetchApi.request({
    url: '/courses/export',
    responseType: 'blob',
    params: {
      query,
      status,
    },
  });
  return response.data;
};
