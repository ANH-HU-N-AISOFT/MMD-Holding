import { TFunction } from 'i18next';
import { DocumentTemplateType } from './DocumentTemplateType';

export const getDocumentTemplateTypeMappingToLabels = (
  t: TFunction<['common', 'enum']>,
): Record<DocumentTemplateType, string> => {
  return {
    [DocumentTemplateType.CONTRACT]: t('enum:documentTemplateType.options.CONTRACT'),
    [DocumentTemplateType.REGISTRATION_FORM]: t('enum:documentTemplateType.options.REGISTRATION_FORM'),
  };
};
