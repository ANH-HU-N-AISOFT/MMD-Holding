import { AxiosResponse } from 'axios';
import { DocumentTemplate } from '../models/DocumentTemplate';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = DocumentTemplate;

interface GetDocumentTemplate {
  id: DocumentTemplate['id'];
}

export const getDocumentTemplate = async ({ id }: GetDocumentTemplate) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/document-templates/${id}`,
  });
  return response.data;
};
