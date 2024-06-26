import { TagProps } from 'reactjs';
import { DocumentTemplateStatus } from '../models/DocumentTemplateStatus';

export const DocumentTemplateStatusMappingToColors: Record<DocumentTemplateStatus, TagProps['color']> = {
  [DocumentTemplateStatus.ACTIVE]: 'success',
  [DocumentTemplateStatus.IN_ACTIVE]: 'error',
};
