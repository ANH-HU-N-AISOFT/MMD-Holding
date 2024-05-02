import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportStudents {
  query?: string;
}

export const exportStudents = async ({ query }: ExportStudents) => {
  const response = await fetchApi.request({
    url: '/students/export',
    responseType: 'blob',
    params: {
      query,
    },
  });
  return response.data;
};
