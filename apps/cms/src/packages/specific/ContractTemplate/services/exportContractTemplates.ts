import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportContractTemplates {
  query?: string;
}

export const exportContractTemplates = async ({ query }: ExportContractTemplates) => {
  const response = await fetchApi.request({
    url: '/contract-templates/export',
    responseType: 'blob',
    params: { query },
  });
  return response.data;
};
