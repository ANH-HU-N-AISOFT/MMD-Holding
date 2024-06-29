import { DocumentTemplateStatus } from './DocumentTemplateStatus';
import { DocumentTemplateType } from './DocumentTemplateType';

export interface DocumentTemplate {
  id: string;
  name: string;
  type: DocumentTemplateType;
  description: string;
  filePath: string;
  status: DocumentTemplateStatus;
  createdAt: string;
}
