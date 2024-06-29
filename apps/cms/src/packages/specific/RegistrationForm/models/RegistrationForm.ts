import { FormValues } from '../components/FormMutation/FormMutation';

export type RegistrationForm = FormValues & {
  id: string;
  createdAt: string;
  organization?: string;
};

// export interface RegistrationForm {
//   id: string;
//   code: string;
//   student?: {
//     studentId: string;
//     studentPhone: string;
//     studentEmail: string;
//     studentDateOfBirth: string | null;
//     studentGender: string | null;
//     studentCurrentAddress: string;
//     studentCityName: string;
//     studentCityId: string;
//     studentCityCode: string | null;
//     studentDistrict: string | null;
//     studentParentPhone: string;
//     notifyResultToParent: boolean | null;
//   };

//   course?: Array<{
//     id: string;
//     name: string;
//   }>;
//   paymentMethod: PaymentMethod;

//   benefitDeposit: number | null;
//   receiptNumber: string;
//   volumeNumber: string;
//   firstTuitionFee: number;
//   firstReceiptNumber: string;
//   firstVolumeNumber: string;
//   secondTuitionFee?: number;
//   secondReceiptNumber?: string;
//   secondVolumeNumber?: string;
//   thirdTuitionFee?: number;
//   thirdReceiptNumber?: string;
//   thirdVolumeNumber?: string;
//   commitmentCompletionDate: string;
//   notes?: string;

//   registrationDateOfProgramChange: string;
//   newDiscountOfProgramChange: string;
//   newTuitionFeeOfProgramChange: number;
//   registrationDateOfCourseChange: string;
//   newDiscountOfCourseChange: string;
//   newTuitionFeeOfCourseChange: number;
//   registrationDateOfAdditionalCourseRegistration1: string;
//   additionalCourseOfAdditionalCourseRegistration1: string;
//   additionalTuitionFeeOfAdditionalCourseRegistration1: number;
//   registrationDateOfAdditionalCourseRegistration2: string;
//   additionalCourseOfAdditionalCourseRegistration2: string;
//   additionalTuitionFeeOfAdditionalCourseRegistration2: number;

//   createdAt?: string;
// }
