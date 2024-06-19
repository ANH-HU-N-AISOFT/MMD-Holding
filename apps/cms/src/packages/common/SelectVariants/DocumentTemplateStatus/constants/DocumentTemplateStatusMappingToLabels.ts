import { TFunction } from 'i18next';
import { DocumentTemplateStatus } from './DocumentTemplateStatus';

export const getDocumentTemplateStatusMappingToLabels = (
  t: TFunction<['common', 'enum']>,
): Record<DocumentTemplateStatus, string> => {
  return {
    [DocumentTemplateStatus.ACTIVE]: t('enum:document_template_status.options.ACTIVE'),
    [DocumentTemplateStatus.IN_ACTIVE]: t('enum:document_template_status.options.IN_ACTIVE'),
  };
};
