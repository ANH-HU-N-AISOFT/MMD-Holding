import { DocumentTemplate } from '../models/DocumentTemplate';
import { DocumentTemplateStatus } from '../models/DocumentTemplateStatus';
import { DocumentTemplateType } from '../models/DocumentTemplateType';
import { update } from './data';

export interface UpdateDocumentTemplate {
  id: DocumentTemplate['id'];
  data: {
    id: DocumentTemplate['id'];
    name: string;
    description: string | undefined | null;
    file: string;
    status: DocumentTemplateStatus;
    type: DocumentTemplateType;
  };
}

export interface ResponseSuccess {}

export const updateDocumentTemplate = async ({ data, id }: UpdateDocumentTemplate) => {
  // const response = await fetchApi.request({
  //   method: 'PUT',
  //   url: `/document-templates/${id}`,
  //   data: data,
  // });
  // return response.data;
  return update(id, data);
};
