import { TFunction } from 'i18next';
import { DocumentTemplateStatus } from './DocumentTemplateStatus';

export const getDocumentTemplateStatusMappingToLabels = (
  t: TFunction<['common', 'enum']>,
): Record<DocumentTemplateStatus, string> => {
  return {
    [DocumentTemplateStatus.ACTIVE]: t('enum:documentTemplateStatus.options.ACTIVE'),
    [DocumentTemplateStatus.IN_ACTIVE]: t('enum:documentTemplateStatus.options.IN_ACTIVE'),
  };
};
