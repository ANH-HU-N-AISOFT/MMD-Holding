import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportEmployees {
  query?: string;
}

export const exportEmployees = async ({ query }: ExportEmployees) => {
  const response = await fetchApi.request({
    url: '/employees/export',
    responseType: 'blob',
    params: {
      query,
    },
  });
  return response.data;
};
