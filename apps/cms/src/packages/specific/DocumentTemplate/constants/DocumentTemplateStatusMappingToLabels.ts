import { TFunction } from 'i18next';
import { DocumentTemplateStatus } from '../models/DocumentTemplateStatus';

export const getDocumentTemplateStatusMappingToLabels = (
  t: TFunction<['document_template']>,
): Record<DocumentTemplateStatus, string> => {
  return {
    [DocumentTemplateStatus.ACTIVE]: t('document_template:ACTIVE'),
    [DocumentTemplateStatus.IN_ACTIVE]: t('document_template:IN_ACTIVE'),
  };
};
