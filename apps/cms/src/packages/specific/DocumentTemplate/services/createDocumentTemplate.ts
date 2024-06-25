import { DocumentTemplate } from '../models/DocumentTemplate';
import { DocumentTemplateStatus } from '../models/DocumentTemplateStatus';
import { DocumentTemplateType } from '../models/DocumentTemplateType';
import { add, documentTemplates } from './data';

export interface CreateDocumentTemplate {
  name: string;
  description: string | undefined | null;
  file: string;
  status: DocumentTemplateStatus;
  type: DocumentTemplateType;
}

export type ResponseSuccess = DocumentTemplate;

export const createDocumentTemplate = async (data: CreateDocumentTemplate) => {
  // const response = await fetchApi.request({
  //   method: 'POST',
  //   url: '/document-templates',
  //   data: data,
  // });
  // return response.data;

  const maxId = documentTemplates.reduce((max, template) => Math.max(max, parseInt(template.id)), 0);

  const newDocumentTemplate: DocumentTemplate = {
    id: (maxId + 1).toString(), // Generating a new id based on the max id + 1
    name: data.name,
    description: data.description || '',
    createdAt: new Date().toISOString(),
    file: data.file,
    status: data.status,
    type: data.type,
  };

  add(newDocumentTemplate);

  return newDocumentTemplate;
};
