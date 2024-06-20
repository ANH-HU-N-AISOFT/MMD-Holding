import { localStorage } from 'utilities';
import { RegistrationForm } from '../models/RegistrationForm';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { PaymentMethod } from '~/packages/common/SelectVariants/PaymentMethod/constants/PaymentMethod';

const KEY = 'registrationForms';

const defaultRecords: RegistrationForm[] = [
  {
    id: '1',
    code: 'ROOT/HV000014',
    studentId: '66424fcf6f0a835b44b028cb',
    studentName: 'Lê Thu A',
    studentPhone: '0987788990',
    studentEmail: 'lethua@example.com',
    studentDateOfBirth: '2000-01-01T00:00:00Z',
    studentGender: GenderEnum.MALE,
    studentCurrentAddress: '123 Đường Láng',
    studentCityName: 'Hà Nội',
    studentCityId: '6638fdc520021dca4d6b75c4',
    studentCityCode: '01',
    studentDistrict: '6638fe3920021dca4d6b7609',
    studentParentPhone: '0987788991',
    notifyResultToParent: true,
    courses: [
      {
        id: '7',
        name: 'Khóa IELTS Advance (6.5 - 7.0+)',
        numberSession: 30,
      },
    ],
    totalNumberSessions: 30,
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
    code: 'ROOT/HV000010',
    studentId: '66390017b57af2c57e17da06',
    studentName: 'Nguyễn Thị Thu Thảo',
    studentPhone: '0857432567',
    studentEmail: 'thuy.tran+10010@sotatek.com',
    studentDateOfBirth: '2001-02-02T00:00:00Z',
    studentGender: GenderEnum.FEMALE,
    studentCurrentAddress: '456 Trần Phú',
    studentCityName: 'Hà Nội',
    studentCityId: '6638fdc520021dca4d6b75c4',
    studentCityCode: '01',
    studentDistrict: '6638fe3920021dca4d6b7614',
    studentParentPhone: '0332274041',
    notifyResultToParent: false,
    courses: [
      {
        id: '1',
        name: 'Khóa Basic (A0 - A1)',
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
    code: 'ROOT/HV000013',
    studentId: '663f95b304ff6e02d896e077',
    studentName: 'Trần Thị Thu Thủy',
    studentPhone: '0976567889',
    studentEmail: 'thuyiris23@gmail.com',
    studentDateOfBirth: '1999-03-03T00:00:00Z',
    studentGender: GenderEnum.FEMALE,
    studentCurrentAddress: 'Hà Nội',
    studentCityName: 'Nam Định',
    studentCityId: '6638fdc520021dca4d6b75db',
    studentCityCode: '25',
    studentDistrict: '6638fe3920021dca4d6b7740',
    studentParentPhone: '0912345674',
    notifyResultToParent: true,
    courses: [
      {
        id: '5',
        name: 'Khóa Intermediate (3.5 - 5.0)',
        numberSession: 25,
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
