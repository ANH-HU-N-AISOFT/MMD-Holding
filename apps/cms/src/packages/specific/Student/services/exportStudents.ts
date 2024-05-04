import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportStudents {
  query?: string;
  orgCodes?: string;
}

export const exportStudents = async ({ query, orgCodes }: ExportStudents) => {
  const response = await fetchApi.request({
    url: '/students/export',
    responseType: 'blob',
    params: {
      query,
      orgCodes,
    },
  });
  return response.data;
};
