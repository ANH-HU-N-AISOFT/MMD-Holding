import { localStorage } from 'utilities';
import { DocumentTemplate } from '../models/DocumentTemplate';
import { DocumentTemplateStatus } from '~/packages/common/SelectVariants/DocumentTemplateStatus/constants/DocumentTemplateStatus';
import { DocumentTemplateType } from '~/packages/common/SelectVariants/DocumentTemplateType/constants/DocumentTemplateType';

const KEY = 'documentTemplates';

export let documentTemplates: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Mẫu hợp đồng',
    description: '',
    createdAt: '2024-06-18T08:30:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '2',
    name: 'Mẫu phiếu đăng ký học viên',
    description: '',
    createdAt: '2024-06-18T10:45:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
];

export const remove = (index: number) => {
  documentTemplates = [...documentTemplates.slice(0, index), ...documentTemplates.slice(index + 1)];
  localStorage.setItem(KEY, JSON.stringify(documentTemplates));
};

export const add = (record: DocumentTemplate) => {
  documentTemplates = [record, ...documentTemplates];
  localStorage.setItem(KEY, JSON.stringify(documentTemplates));
};

export const update = (
  id: DocumentTemplate['id'],
  data: {
    id: DocumentTemplate['id'];
    name: string;
    description: string | undefined | null;
    file: string;
    status: DocumentTemplateStatus;
    type: DocumentTemplateType;
  },
) => {
  const index = documentTemplates.findIndex(template => template.id === id);

  if (index === -1) {
    return null;
  }

  const updatedTemplate: DocumentTemplate = {
    ...documentTemplates[index],
    name: data.name,
    description: data.description || '',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: data.status,
    type: data.type,
  };

  documentTemplates[index] = updatedTemplate;

  localStorage.setItem(KEY, JSON.stringify(documentTemplates));

  return documentTemplates[index];
};
