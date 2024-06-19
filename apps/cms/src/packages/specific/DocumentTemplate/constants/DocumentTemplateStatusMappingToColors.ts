import { TagProps } from 'antd';
import { DocumentTemplateStatus } from '~/packages/common/SelectVariants/DocumentTemplateStatus/constants/DocumentTemplateStatus';

export const DocumentTemplateStatusMappingToColors: Record<DocumentTemplateStatus, TagProps['color']> = {
  [DocumentTemplateStatus.ACTIVE]: 'success',
  [DocumentTemplateStatus.IN_ACTIVE]: 'error',
};
