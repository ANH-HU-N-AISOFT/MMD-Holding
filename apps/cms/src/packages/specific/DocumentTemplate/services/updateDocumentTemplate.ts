import { DocumentTemplate } from '../models/DocumentTemplate';
import { DocumentTemplateType } from '../models/DocumentTemplateType';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateDocumentTemplate {
  id: DocumentTemplate['id'];
  data: {
    id: DocumentTemplate['id'];
    name: string;
    type: DocumentTemplateType;
    description: string | undefined | null;
    file?: File;
  };
}

export interface ResponseSuccess {}

export const updateDocumentTemplate = async ({ data, id }: UpdateDocumentTemplate) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/document-templates/${id}`,
    data: data,
  });
  return response.data;
};
