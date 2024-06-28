import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportStudents {
  query?: string;
  orgCodes?: string;
  withoutPermission: boolean;
}

export const exportStudents = async ({ query, orgCodes, withoutPermission }: ExportStudents) => {
  const response = await fetchApi.request({
    url: '/students/export',
    responseType: 'blob',
    params: {
      query,
      orgCodes,
      withoutPermission,
    },
  });
  return response.data;
};
