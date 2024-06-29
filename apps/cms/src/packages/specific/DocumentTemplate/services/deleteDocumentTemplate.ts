import { DocumentTemplate } from '../models/DocumentTemplate';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteDocumentTemplate {
  id: DocumentTemplate['id'];
}

export const deleteDocumentTemplate = async ({ id }: DeleteDocumentTemplate) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/document-templates/${id}`,
  });
  return response.data;
};
