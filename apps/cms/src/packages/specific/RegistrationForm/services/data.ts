import { localStorage } from 'utilities';
import { PaymentMethod } from '../models/PaymentMethod';
import { RegistrationForm } from '../models/RegistrationForm';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';

const KEY = 'registrationForms';

export let registrationForms: RegistrationForm[] = [
  {
    id: '1',
    organization: 'Arena Hà Nam',
    code: 'AHN1/HV000006',
    studentId: 'Lê Nhật A',
    studentName: 'Lê Nhật A',
    studentPhone: '0901234705',
    studentEmail: 'cvan70549@gmail.com',
    studentDateOfBirth: '2002-01-31T00:00:00Z',
    studentGender: GenderEnum.FEMALE,
    studentCurrentAddress: 'Số 1, Trần Phú, Ba Đình, Hà Nội',
    studentCityName: undefined,
    studentCityId: undefined,
    studentCityCode: undefined,
    studentDistrict: undefined,
    studentParentPhone: '0901234572',
    notifyResultToParent: true,
    courses: [
      {
        id: 'Giao tiếp + phát âm (CM1) - 20 buổi',
        name: 'Giao tiếp + phát âm',
        numberSession: 20,
      },
    ],
    totalNumberSessions: 20,
    originPrice: 6250000,
    salePrice: 5250000,
    promotion: 1000000,
    promotionType: 'price',
    paymentMethod: PaymentMethod.BANK,
    benefitDeposit: 1000000,
    receiptNumber: 'RC001',
    volumeNumber: 'VN001',
    firstTuitionFee: 2000000,
    firstReceiptNumber: 'FR001',
    firstVolumeNumber: 'FV001',
    secondTuitionFee: 2000000,
    secondReceiptNumber: 'SR001',
    secondVolumeNumber: 'SV001',
    thirdTuitionFee: 1250000,
    thirdReceiptNumber: 'TR001',
    thirdVolumeNumber: 'TV001',
    commitmentCompletionDate: '2024-08-20T00:00:00Z',
    notes: 'Không có ghi chú',
    registrationDateOfProgramChange: undefined,
    newDiscountOfProgramChange: undefined,
    newTuitionFeeOfProgramChange: undefined,
    registrationDateOfCourseChange: undefined,
    newDiscountOfCourseChange: undefined,
    newTuitionFeeOfCourseChange: undefined,
    registrationDateOfAdditionalCourseRegistration1: undefined,
    additionalCourseOfAdditionalCourseRegistration1: undefined,
    additionalTuitionFeeOfAdditionalCourseRegistration1: undefined,
    registrationDateOfAdditionalCourseRegistration2: undefined,
    additionalCourseOfAdditionalCourseRegistration2: undefined,
    additionalTuitionFeeOfAdditionalCourseRegistration2: undefined,
    createdAt: '2024-06-17T08:00:00Z',
  },
  {
    id: '2',
    organization: 'Arena Hà Nam',
    code: 'AHN1/HV000007',
    studentId: 'Lê Nhật B',
    studentName: 'Lê Nhật B',
    studentPhone: '0901234706',
    studentEmail: 'datsinh72@gmail.com',
    studentDateOfBirth: '2002-01-31T00:00:00Z',
    studentGender: GenderEnum.MALE,
    studentCurrentAddress: 'Số 1, Trần Phú, Ba Đình, Hà Nội',
    studentCityName: undefined,
    studentCityId: undefined,
    studentCityCode: undefined,
    studentDistrict: undefined,
    studentParentPhone: '0901234573',
    notifyResultToParent: true,
    courses: [
      {
        id: 'Khóa nền nâng cao (SPU1) - 20 buổi',
        name: 'Khóa nền nâng cao',
        numberSession: 20,
      },
    ],
    totalNumberSessions: 20,
    originPrice: 4750000,
    salePrice: 4750000,
    promotion: 0,
    promotionType: 'price',
    paymentMethod: PaymentMethod.CASH,
    benefitDeposit: 750000,
    receiptNumber: 'RC002',
    volumeNumber: 'VN002',
    firstTuitionFee: 1000000,
    firstReceiptNumber: 'FR002',
    firstVolumeNumber: 'FV002',
    secondTuitionFee: 1000000,
    secondReceiptNumber: 'SR002',
    secondVolumeNumber: 'SV002',
    thirdTuitionFee: 2000000,
    thirdReceiptNumber: 'TR002',
    thirdVolumeNumber: 'TV002',
    commitmentCompletionDate: '2024-09-30T00:00:00Z',
    notes: 'Ghi chú thêm',
    registrationDateOfProgramChange: undefined,
    newDiscountOfProgramChange: undefined,
    newTuitionFeeOfProgramChange: undefined,
    registrationDateOfCourseChange: undefined,
    newDiscountOfCourseChange: undefined,
    newTuitionFeeOfCourseChange: undefined,
    registrationDateOfAdditionalCourseRegistration1: undefined,
    additionalCourseOfAdditionalCourseRegistration1: undefined,
    additionalTuitionFeeOfAdditionalCourseRegistration1: undefined,
    registrationDateOfAdditionalCourseRegistration2: undefined,
    additionalCourseOfAdditionalCourseRegistration2: undefined,
    additionalTuitionFeeOfAdditionalCourseRegistration2: undefined,
    createdAt: '2024-06-08T10:00:00Z',
  },
  {
    id: '3',
    organization: 'Arena Hà Nam',
    code: 'AHN1/HV000009',
    studentId: 'Lê Nhật D',
    studentName: 'Lê Nhật D',
    studentPhone: '0901234708',
    studentEmail: 'gyuonghia@gmail.com',
    studentDateOfBirth: '2002-01-31T00:00:00Z',
    studentGender: GenderEnum.MALE,
    studentCurrentAddress: 'Số 1, Trần Phú, Ba Đình, Hà Nội',
    studentCityName: undefined,
    studentCityId: undefined,
    studentCityCode: undefined,
    studentDistrict: undefined,
    studentParentPhone: '0901234575',
    notifyResultToParent: true,
    courses: [
      {
        id: 'Khóa nền cơ bản (BASIC1) - 20 buổi',
        name: 'Khóa nền cơ bản',
        numberSession: 20,
      },
    ],
    totalNumberSessions: 20,
    originPrice: 4125000,
    salePrice: 4125000,
    promotion: 0,
    promotionType: 'price',
    paymentMethod: PaymentMethod.POS,
    benefitDeposit: 1125000,
    receiptNumber: 'RC003',
    volumeNumber: 'VN003',
    firstTuitionFee: 1000000,
    firstReceiptNumber: 'FR003',
    firstVolumeNumber: 'FV003',
    secondTuitionFee: 1000000,
    secondReceiptNumber: 'SR003',
    secondVolumeNumber: 'SV003',
    thirdTuitionFee: 1000000,
    thirdReceiptNumber: 'TR003',
    thirdVolumeNumber: 'TV003',
    commitmentCompletionDate: '2024-10-02T00:00:00Z',
    notes: 'Không có ghi chú',
    registrationDateOfProgramChange: undefined,
    newDiscountOfProgramChange: undefined,
    newTuitionFeeOfProgramChange: undefined,
    registrationDateOfCourseChange: undefined,
    newDiscountOfCourseChange: undefined,
    newTuitionFeeOfCourseChange: undefined,
    registrationDateOfAdditionalCourseRegistration1: undefined,
    additionalCourseOfAdditionalCourseRegistration1: undefined,
    additionalTuitionFeeOfAdditionalCourseRegistration1: undefined,
    registrationDateOfAdditionalCourseRegistration2: undefined,
    additionalCourseOfAdditionalCourseRegistration2: undefined,
    additionalTuitionFeeOfAdditionalCourseRegistration2: undefined,
    createdAt: '2024-06-02T12:00:00Z',
  },
];

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
