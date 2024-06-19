import { DocumentTemplate } from '../models/DocumentTemplate';
import { documentTemplates } from './data';

export type ResponseSuccess = DocumentTemplate;

interface GetDocumentTemplate {
  id: DocumentTemplate['id'];
}

export const getDocumentTemplate = async ({ id }: GetDocumentTemplate) => {
  // const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
  //   method: 'GET',
  //   url: `/document-templates/${id}`,
  // });
  // return response.data;

  const documentTemplate = documentTemplates.find(template => template.id === id);

  if (!documentTemplate) {
    throw new Error('Contact template not exist');
  }

  return documentTemplate;
};
