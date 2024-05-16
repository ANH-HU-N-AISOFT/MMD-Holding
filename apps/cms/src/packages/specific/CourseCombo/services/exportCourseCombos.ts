import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportCourseCombos {
  query?: string;
  status?: string;
}

export const exportCourseCombos = async ({ query, status }: ExportCourseCombos) => {
  const response = await fetchApi.request({
    url: '/course-combos/export',
    responseType: 'blob',
    params: {
      query,
      status,
    },
  });
  return response.data;
};
