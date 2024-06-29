import { DocumentTemplate } from '../models/DocumentTemplate';
import { DocumentTemplateType } from '../models/DocumentTemplateType';
import { fetchApi } from '~/utils/functions/fetchApi';
import { objectToFormData } from '~/utils/functions/formData/objectToFormData';

export interface CreateDocumentTemplate {
  name: string;
  type: DocumentTemplateType;
  description: string | null;
  file: File | undefined;
}

export type ResponseSuccess = DocumentTemplate;

export const createDocumentTemplate = async (data: CreateDocumentTemplate) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/document-templates',
    data: objectToFormData(data),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
