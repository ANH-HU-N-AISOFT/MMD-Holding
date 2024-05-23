import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportConsultantForms {
  query?: string;
}

export const exportConsultantForms = async ({ query }: ExportConsultantForms) => {
  const response = await fetchApi.request({
    url: '/courses/export',
    responseType: 'blob',
    params: {
      query,
    },
  });
  return response.data;
};
