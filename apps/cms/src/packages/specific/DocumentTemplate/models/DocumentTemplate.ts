import { DocumentTemplateStatus } from './DocumentTemplateStatus';
import { DocumentTemplateType } from './DocumentTemplateType';

export interface DocumentTemplate {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  file: string;
  status: DocumentTemplateStatus;
  type: DocumentTemplateType;
}
