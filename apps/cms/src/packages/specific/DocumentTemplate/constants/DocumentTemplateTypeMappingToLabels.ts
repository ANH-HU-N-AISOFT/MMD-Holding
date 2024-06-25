import { TFunction } from 'i18next';
import { DocumentTemplateType } from '../models/DocumentTemplateType';

export const getDocumentTemplateTypeMappingToLabels = (
  t: TFunction<['document_template']>,
): Record<DocumentTemplateType, string> => {
  return {
    [DocumentTemplateType.CONTRACT]: t('document_template:CONTRACT'),
    [DocumentTemplateType.REGISTRATION_FORM]: t('document_template:REGISTRATION_FORM'),
  };
};
