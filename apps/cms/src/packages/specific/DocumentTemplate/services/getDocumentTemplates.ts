import { AxiosResponse } from 'axios';
import { DocumentTemplate } from '../models/DocumentTemplate';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: DocumentTemplate[];
  total: number;
}

interface GetDocumentTemplates {
  query?: string;
  page?: number;
  perPage?: number;
  createdDate?: string;
}
export const getDocumentTemplates = async ({ page, perPage, query, createdDate }: GetDocumentTemplates) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/document-templates',
    params: {
      page,
      query,
      perPage,
      createdDate,
    },
  });

  return response.data;
};
