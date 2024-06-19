import { DocumentTemplate } from '../models/DocumentTemplate';
import { update } from './data';
import { DocumentTemplateStatus } from '~/packages/common/SelectVariants/DocumentTemplateStatus/constants/DocumentTemplateStatus';
import { DocumentTemplateType } from '~/packages/common/SelectVariants/DocumentTemplateType/constants/DocumentTemplateType';

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
