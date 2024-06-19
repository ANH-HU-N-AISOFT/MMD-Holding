import { delay } from 'utilities';
import { DocumentTemplate } from '../models/DocumentTemplate';
import { documentTemplates, remove } from './data';

export interface DeleteDocumentTemplate {
  id: DocumentTemplate['id'];
}

export const deleteDocumentTemplate = async ({ id }: DeleteDocumentTemplate) => {
  // const response = await fetchApi.request({
  //   method: 'DELETE',
  //   url: `/document-templates/${id}`,
  // });
  // return response.data;

  await delay(500);

  const index = documentTemplates.findIndex(template => template.id === id);

  if (index === -1) {
    return { success: false, message: 'Document template not found' };
  }

  remove(index);

  return { success: true, message: 'Document template deleted successfully' };
};
