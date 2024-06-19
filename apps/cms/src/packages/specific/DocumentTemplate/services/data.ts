import { localStorage } from 'utilities';
import { DocumentTemplate } from '../models/DocumentTemplate';
import { DocumentTemplateStatus } from '~/packages/common/SelectVariants/DocumentTemplateStatus/constants/DocumentTemplateStatus';
import { DocumentTemplateType } from '~/packages/common/SelectVariants/DocumentTemplateType/constants/DocumentTemplateType';

const KEY = 'documentTemplates';

const defaultRecords: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Hợp đồng đăng ký học viên',
    description: 'Hợp đồng cho việc đăng ký học viên vào các khóa học IELTS',
    createdAt: '2023-01-15T08:30:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '2',
    name: 'Hợp đồng tuyển dụng giáo viên',
    description: 'Hợp đồng tuyển dụng giáo viên IELTS',
    createdAt: '2023-02-10T10:45:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '3',
    name: 'Hợp đồng bảo mật thông tin',
    description: 'Hợp đồng bảo mật thông tin giữa trung tâm và nhân viên',
    createdAt: '2023-03-05T09:00:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '4',
    name: 'Hợp đồng hợp tác giảng dạy',
    description: 'Hợp đồng hợp tác giảng dạy giữa trung tâm và đối tác',
    createdAt: '2023-04-12T11:20:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '5',
    name: 'Hợp đồng tư vấn giáo dục',
    description: 'Hợp đồng tư vấn giáo dục cho học viên',
    createdAt: '2023-05-01T14:10:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '6',
    name: 'Hợp đồng tài trợ học bổng',
    description: 'Hợp đồng tài trợ học bổng cho học viên xuất sắc',
    createdAt: '2023-06-18T16:30:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '7',
    name: 'Hợp đồng sử dụng dịch vụ',
    description: 'Hợp đồng sử dụng dịch vụ của trung tâm',
    createdAt: '2023-07-22T09:40:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '28',
    name: 'Đơn đăng ký khóa học trực tuyến',
    description: 'Đơn đăng ký tham gia các khóa học trực tuyến của trung tâm',
    createdAt: '2023-08-07T08:47:54.858Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.IN_ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
  {
    id: '26',
    name: 'Đơn đăng ký tham gia hoạt động ngoại khóa',
    description: 'Đơn đăng ký tham gia các hoạt động ngoại khóa của trung tâm',
    createdAt: '2023-08-09T13:16:01.119Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
  {
    id: '8',
    name: 'Hợp đồng thanh toán học phí',
    description: 'Hợp đồng thanh toán học phí cho các khóa học IELTS',
    createdAt: '2023-08-14T10:50:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '9',
    name: 'Hợp đồng bảo hiểm học viên',
    description: 'Hợp đồng bảo hiểm học viên trong thời gian học tập',
    createdAt: '2023-09-10T08:20:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '10',
    name: 'Hợp đồng thử việc giáo viên',
    description: 'Hợp đồng thử việc cho giáo viên mới',
    createdAt: '2023-10-05T11:30:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '22',
    name: 'Đơn đăng ký dự thi',
    description: 'Đơn đăng ký dự thi IELTS',
    createdAt: '2023-11-10T10:27:41.630Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.IN_ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
  {
    id: '21',
    name: 'Đơn đăng ký học viên',
    description: 'Đơn đăng ký học viên vào các khóa học IELTS',
    createdAt: '2023-11-12T16:09:37.831Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
  {
    id: '25',
    name: 'Đơn xin nghỉ học',
    description: 'Đơn xin nghỉ học cho học viên',
    createdAt: '2023-11-14T14:12:32.548Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
  {
    id: '11',
    name: 'Hợp đồng phụ huynh và trung tâm',
    description: 'Hợp đồng giữa phụ huynh và trung tâm về việc học của con em',
    createdAt: '2023-11-22T15:10:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '12',
    name: 'Hợp đồng đào tạo trực tuyến',
    description: 'Hợp đồng đào tạo trực tuyến các khóa học IELTS',
    createdAt: '2023-12-01T12:15:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '13',
    name: 'Hợp đồng hỗ trợ kỹ thuật',
    description: 'Hợp đồng hỗ trợ kỹ thuật cho các lớp học trực tuyến',
    createdAt: '2024-01-08T14:40:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '23',
    name: 'Đơn xin nghỉ phép',
    description: 'Đơn xin nghỉ phép cho giáo viên',
    createdAt: '2024-02-06T11:08:49.459Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.IN_ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
  {
    id: '14',
    name: 'Hợp đồng thuê phòng học',
    description: 'Hợp đồng thuê phòng học cho các khóa học IELTS',
    createdAt: '2024-02-18T09:00:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '15',
    name: 'Hợp đồng cung cấp thiết bị',
    description: 'Hợp đồng cung cấp thiết bị giảng dạy cho trung tâm',
    createdAt: '2024-03-15T13:30:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '16',
    name: 'Hợp đồng dịch vụ vệ sinh',
    description: 'Hợp đồng dịch vụ vệ sinh cho trung tâm',
    createdAt: '2024-04-20T16:50:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '17',
    name: 'Hợp đồng quảng cáo',
    description: 'Hợp đồng quảng cáo khóa học IELTS trên các phương tiện truyền thông',
    createdAt: '2024-05-12T11:10:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '27',
    name: 'Đơn đăng ký sử dụng thư viện',
    description: 'Đơn đăng ký sử dụng thư viện của trung tâm',
    createdAt: '2024-05-13T18:45:55.538Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.REGISTRATION_FORM,
  },
  {
    id: '18',
    name: 'Hợp đồng đối tác chiến lược',
    description: 'Hợp đồng hợp tác chiến lược với các đối tác giáo dục',
    createdAt: '2024-06-25T10:20:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '23',
    name: 'Hợp đồng tài chính',
    description: 'Hợp đồng tài chính và quản lý học phí',
    createdAt: '2024-07-30T14:25:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
  {
    id: '20',
    name: 'Hợp đồng quản lý học viên',
    description: 'Hợp đồng quản lý học viên và tiến độ học tập',
    createdAt: '2024-08-05T12:45:00Z',
    file: 'https://projects.wojtekmaj.pl/react-pdf/assets/sample-8bb8af10.pdf',
    status: DocumentTemplateStatus.ACTIVE,
    type: DocumentTemplateType.CONTRACT,
  },
];

export let documentTemplates: DocumentTemplate[] = [];

const initialize = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? '');
    documentTemplates = data;
  } catch {
    documentTemplates = defaultRecords;
    localStorage.setItem(KEY, JSON.stringify(defaultRecords));
  }
};
initialize();

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
