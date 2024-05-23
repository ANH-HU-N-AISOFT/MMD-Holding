import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportDiscounts {
  query?: string;
}

export const exportDiscounts = async ({ query }: ExportDiscounts) => {
  const response = await fetchApi.request({
    url: '/courses/export',
    responseType: 'blob',
    params: {
      query,
    },
  });
  return response.data;
};
