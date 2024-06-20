import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { PaymentMethod } from '~/packages/common/SelectVariants/PaymentMethod/constants/PaymentMethod';

export interface RegistrationForm {
  id: string;
  code: string;
  student?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string;
    gender: GenderEnum;
    currentAddress: string;
    province?: {
      id: string;
      name: string;
      code: string;
    };
    district?: {
      id: string;
      name: string;
      code: string;
    };
    parentPhone: string;
    notifyParentsOfResults?: boolean;
  };
  course?: Array<{
    id: string;
    name: string;
    code: string;
    numberSessions: number;
    sessionDuration: number;
    price: number;
    notes: string;
  }>;
  paymentMethod: PaymentMethod;

  benefitDeposit: number;
  receiptNumber: string;
  volumeNumber: string;
  firstTuitionFee: number;
  firstReceiptNumber: string;
  firstVolumeNumber: string;
  secondTuitionFee?: number;
  secondReceiptNumber?: string;
  secondVolumeNumber?: string;
  thirdTuitionFee?: number;
  thirdReceiptNumber?: string;
  thirdVolumeNumber?: string;
  commitmentCompletionDate: Date;
  notes?: string;
  programChange: {
    changeRegistrationDate: Date;
    newDiscount?: string;
    newTuitionFee: number;
  };
  courseChange: {
    changeRegistrationDate: Date;
    newCourse?: string;
    newTuitionFeeAfterDiscount: number;
  };
  additionalCourseRegistration1: {
    additionalRegistrationDate: Date;
    additionalCourse?: string;
    additionalTuitionFee: number;
  };
  additionalCourseRegistration2?: {
    additionalRegistrationDate: Date;
    additionalCourse?: string;
    additionalTuitionFee: number;
  };
}
