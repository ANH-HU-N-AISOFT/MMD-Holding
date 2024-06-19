import { DocumentTemplateStatus } from '~/packages/common/SelectVariants/DocumentTemplateStatus/constants/DocumentTemplateStatus';
import { DocumentTemplateType } from '~/packages/common/SelectVariants/DocumentTemplateType/constants/DocumentTemplateType';

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  file: string;
  status: DocumentTemplateStatus;
  type: DocumentTemplateType;
}
