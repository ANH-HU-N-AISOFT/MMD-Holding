import { localStorage } from 'utilities';
import { RegistrationForm } from '../models/RegistrationForm';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { PaymentMethod } from '~/packages/common/SelectVariants/PaymentMethod/constants/PaymentMethod';

const KEY = 'registrationForms';

const defaultRecords: RegistrationForm[] = [
  {
    id: '1',
    organization: 'Trần Bình',
    code: 'AHN8/HV000014',
    studentId: 'Lê Thu Anh',
    studentName: 'Lê Thu Anh',
    studentPhone: '0987788990',
    studentEmail: 'lethua@example.com',
    studentDateOfBirth: '2000-01-01T00:00:00Z',
    studentGender: GenderEnum.MALE,
    studentCurrentAddress: '123 Đường Láng',
    studentCityName: 'Hà Nội',
    studentCityId: 'Hà Nội',
    studentCityCode: 'Hà Nội',
    studentDistrict: 'quận Đống Đa',
    studentParentPhone: '0987788991',
    notifyResultToParent: true,
    courses: [
      {
        id: 'Lộ trình học lên B1 (B1) - 10 buổi',
        name: 'Lộ trình học lên B1',
        numberSession: 10,
      },
    ],
    totalNumberSessions: 10,
    originPrice: 10000000,
    salePrice: 9000000,
    promotion: 1000000,
    promotionType: 'price',
    paymentMethod: PaymentMethod.BANK,
    benefitDeposit: 200000,
    receiptNumber: 'RC001',
    volumeNumber: 'VN001',
    firstTuitionFee: 3000000,
    firstReceiptNumber: 'FR001',
    firstVolumeNumber: 'FV001',
    secondTuitionFee: 3000000,
    secondReceiptNumber: 'SR001',
    secondVolumeNumber: 'SV001',
    thirdTuitionFee: 3000000,
    thirdReceiptNumber: 'TR001',
    thirdVolumeNumber: 'TV001',
    commitmentCompletionDate: '2023-12-31T00:00:00Z',
    notes: 'Không có ghi chú',
    registrationDateOfProgramChange: '2023-06-01T00:00:00Z',
    newDiscountOfProgramChange: 'Khách hàng thứ 100',
    newTuitionFeeOfProgramChange: 8500000,
    registrationDateOfCourseChange: '2023-06-10T00:00:00Z',
    newDiscountOfCourseChange: 'Khách hàng thứ 100',
    newTuitionFeeOfCourseChange: 8000000,
    registrationDateOfAdditionalCourseRegistration1: '2023-07-01T00:00:00Z',
    additionalCourseOfAdditionalCourseRegistration1: 'Khóa IELTS Speaking',
    additionalTuitionFeeOfAdditionalCourseRegistration1: 2000000,
    registrationDateOfAdditionalCourseRegistration2: '2023-08-01T00:00:00Z',
    additionalCourseOfAdditionalCourseRegistration2: 'Khóa IELTS Writing',
    additionalTuitionFeeOfAdditionalCourseRegistration2: 2000000,
    createdAt: '2023-05-01T08:00:00Z',
  },
  {
    id: '2',
    organization: 'Trần Bình',
    code: 'AHN8/HV000010',
    studentId: 'Nguyễn Thị Thu Thảo',
    studentName: 'Nguyễn Thị Thu Thảo',
    studentPhone: '0857432567',
    studentEmail: 'thuy.tran+10010@sotatek.com',
    studentDateOfBirth: '2001-02-02T00:00:00Z',
    studentGender: GenderEnum.FEMALE,
    studentCurrentAddress: '456 Trần Phú',
    studentCityName: 'Hà Nội',
    studentCityId: 'Hà Nội',
    studentCityCode: 'Hà Nội',
    studentDistrict: 'quận Hà Đông',
    studentParentPhone: '0332274041',
    notifyResultToParent: false,
    courses: [
      {
        id: 'Khóa nền cơ bản (Basic) - 20 buổi',
        name: 'Khóa nền cơ bản',
        numberSession: 20,
      },
    ],
    totalNumberSessions: 20,
    originPrice: 8000000,
    salePrice: 7000000,
    promotion: 1000000,
    promotionType: 'price',
    paymentMethod: PaymentMethod.CASH,
    benefitDeposit: 150000,
    receiptNumber: 'RC002',
    volumeNumber: 'VN002',
    firstTuitionFee: 2500000,
    firstReceiptNumber: 'FR002',
    firstVolumeNumber: 'FV002',
    secondTuitionFee: 2500000,
    secondReceiptNumber: 'SR002',
    secondVolumeNumber: 'SV002',
    thirdTuitionFee: 2500000,
    thirdReceiptNumber: 'TR002',
    thirdVolumeNumber: 'TV002',
    commitmentCompletionDate: '2023-11-30T00:00:00Z',
    notes: 'Ghi chú thêm',
    registrationDateOfProgramChange: '2023-06-15T00:00:00Z',
    newDiscountOfProgramChange: 'Khách hàng may mắn',
    newTuitionFeeOfProgramChange: 6700000,
    registrationDateOfCourseChange: '2023-07-01T00:00:00Z',
    newDiscountOfCourseChange: 'Khách hàng may mắn',
    newTuitionFeeOfCourseChange: 6500000,
    registrationDateOfAdditionalCourseRegistration1: '2023-08-15T00:00:00Z',
    additionalCourseOfAdditionalCourseRegistration1: 'Khóa IELTS Listening',
    additionalTuitionFeeOfAdditionalCourseRegistration1: 1500000,
    registrationDateOfAdditionalCourseRegistration2: '2023-09-01T00:00:00Z',
    additionalCourseOfAdditionalCourseRegistration2: 'Khóa IELTS Reading',
    additionalTuitionFeeOfAdditionalCourseRegistration2: 1500000,
    createdAt: '2023-05-02T10:00:00Z',
  },
  {
    id: '3',
    organization: 'Trần Bình',
    code: 'AHN8/HV000013',
    studentId: '663f95b304ff6e02d896e077',
    studentName: 'Trần Thị Thu Thủy',
    studentPhone: '0976567889',
    studentEmail: 'thuyiris23@gmail.com',
    studentDateOfBirth: '1999-03-03T00:00:00Z',
    studentGender: GenderEnum.FEMALE,
    studentCurrentAddress: 'Xuân Trường / Nam Định',
    studentCityName: 'Nam Định',
    studentCityId: 'Nam Định',
    studentCityCode: 'Nam Định',
    studentDistrict: 'huyện Xuân Trường',
    studentParentPhone: '0912345674',
    notifyResultToParent: true,
    courses: [
      {
        id: 'Lộ trình giao tiếp từ con số 0 (Beginner) - 10 buổi',
        name: 'Lộ trình giao tiếp từ con số 0',
        numberSession: 10,
      },
    ],
    totalNumberSessions: 25,
    originPrice: 9000000,
    salePrice: 8500000,
    promotion: 500000,
    promotionType: 'price',
    paymentMethod: PaymentMethod.POS,
    benefitDeposit: 250000,
    receiptNumber: 'RC003',
    volumeNumber: 'VN003',
    firstTuitionFee: 3000000,
    firstReceiptNumber: 'FR003',
    firstVolumeNumber: 'FV003',
    secondTuitionFee: 3000000,
    secondReceiptNumber: 'SR003',
    secondVolumeNumber: 'SV003',
    thirdTuitionFee: 3000000,
    thirdReceiptNumber: 'TR003',
    thirdVolumeNumber: 'TV003',
    commitmentCompletionDate: '2023-10-31T00:00:00Z',
    notes: 'Không có ghi chú',
    registrationDateOfProgramChange: '2023-05-01T00:00:00Z',
    newDiscountOfProgramChange: 'Chương trình Hành trình Anh ngữ',
    newTuitionFeeOfProgramChange: 8100000,
    registrationDateOfCourseChange: '2023-06-01T00:00:00Z',
    newDiscountOfCourseChange: 'Chương trình Hành trình Anh ngữ',
    newTuitionFeeOfCourseChange: 7900000,
    registrationDateOfAdditionalCourseRegistration1: '2023-07-15T00:00:00Z',
    additionalCourseOfAdditionalCourseRegistration1: 'Khóa IELTS Speaking',
    additionalTuitionFeeOfAdditionalCourseRegistration1: 1800000,
    registrationDateOfAdditionalCourseRegistration2: '2023-08-01T00:00:00Z',
    additionalCourseOfAdditionalCourseRegistration2: 'Khóa IELTS Writing',
    additionalTuitionFeeOfAdditionalCourseRegistration2: 1800000,
    createdAt: '2023-05-03T12:00:00Z',
  },
];
export let registrationForms: RegistrationForm[] = [];

const initialize = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? '');
    registrationForms = data;
  } catch {
    registrationForms = defaultRecords;
    localStorage.setItem(KEY, JSON.stringify(defaultRecords));
  }
};
initialize();

export const remove = (index: number) => {
  registrationForms = [...registrationForms.slice(0, index), ...registrationForms.slice(index + 1)];
  localStorage.setItem(KEY, JSON.stringify(registrationForms));
};

export const add = (record: RegistrationForm) => {
  registrationForms = [record, ...registrationForms];
  localStorage.setItem(KEY, JSON.stringify(registrationForms));
};

export const update = (id: RegistrationForm['id'], data: Omit<RegistrationForm, 'id' | 'createdAt'>) => {
  const index = registrationForms.findIndex(template => template.id === id);

  if (index === -1) {
    return null;
  }

  const updatedTemplate: RegistrationForm = {
    ...registrationForms[index],
    ...data,
  };

  registrationForms[index] = updatedTemplate;

  localStorage.setItem(KEY, JSON.stringify(registrationForms));

  return registrationForms[index];
};
