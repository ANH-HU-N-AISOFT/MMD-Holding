import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, enum as enum_, literal, boolean, array, number } from 'zod';
import type { TFunction } from 'i18next';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { PaymentMethod } from '~/packages/common/SelectVariants/PaymentMethod/constants/PaymentMethod';
import { getGreaterOrEqualThanMessage } from '~/utils/functions/getGreaterOrEqualThanMessage';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';
import { isEmail, isPhone } from '~/utils/regexes';

export const getFormMutationSchema = (t: TFunction<['common', 'registration_form']>) => {
  const code = {
    required: getRequiredMessage(t, 'registration_form:code'),
  };
  const studentId = {
    required: getRequiredMessageSelectField(t, 'registration_form:student'),
  };
  const studentPhone = {
    required: getRequiredMessage(t, 'registration_form:student_phone'),
    invalid: getInvalidMessage(t, 'registration_form:student_phone'),
  };
  const studentEmail = {
    required: getRequiredMessage(t, 'registration_form:student_email'),
    invalid: getInvalidMessage(t, 'registration_form:student_email'),
  };
  const studentCurrentAddress = {
    length: getRangeLengthMessage(t, 'registration_form:current_address', 3, 64),
    invalid: t('registration_form:current_address_invalid'),
  };
  const studentParentPhone = {
    required: getRequiredMessage(t, 'registration_form:parent_phone'),
    invalid: getInvalidMessage(t, 'registration_form:parent_phone'),
  };
  const course = {
    required: getRequiredMessageSelectField(t, 'registration_form:course'),
  };
  const totalNumberSessions = {
    required: getRequiredMessageSelectField(t, 'registration_form:total_number_sessions'),
  };
  const originPrice = {
    required: getRequiredMessageSelectField(t, 'registration_form:origin_price'),
  };
  const salePrice = {
    required: getRequiredMessageSelectField(t, 'registration_form:origin_price'),
  };
  const promotion = {
    required: getRequiredMessageSelectField(t, 'registration_form:promotion'),
  };
  const paymentMethod = {
    required: getRequiredMessageSelectField(t, 'registration_form:payment_method'),
  };
  const benefitDeposit = {
    min: getGreaterOrEqualThanMessage(t, 'registration_form:benefit_deposit', 0),
  };
  const firstTuitionFee = {
    required: getRequiredMessage(t, 'registration_form:first_tuition_fee'),
  };
  const firstReceiptNumber = {
    required: getRequiredMessage(t, 'registration_form:receipt_number'),
  };
  const firstVolumeNumber = {
    required: getRequiredMessage(t, 'registration_form:volume_number'),
  };
  const secondTuitionFee = {
    min: getGreaterOrEqualThanMessage(t, 'registration_form:second_tuition_fee', 0),
  };
  const thirdTuitionFee = {
    min: getGreaterOrEqualThanMessage(t, 'registration_form:third_tuition_fee', 0),
  };

  return object({
    code: string({ required_error: code.required }).trim().min(1, code.required),
    studentId: string({ required_error: studentId.required }),
    studentPhone: string({ required_error: studentPhone.required })
      .trim()
      .min(1, studentPhone.required)
      .regex(isPhone, studentPhone.invalid),
    studentEmail: string({ required_error: studentEmail.required }).trim().regex(isEmail, studentEmail.invalid),
    studentDateOfBirth: string().optional().nullable(),
    studentGender: enum_([GenderEnum.FEMALE, GenderEnum.MALE]).optional().nullable(),
    studentCurrentAddress: string()
      .trim()
      .min(3, studentCurrentAddress.length)
      .max(64, studentCurrentAddress.length)
      .regex(/^[\p{L}0-9\s/]*$/u, studentCurrentAddress.invalid),
    studentCity: string().trim().optional().or(literal('')).nullable(),
    studentDistrict: string().trim().optional().or(literal('')).nullable(),
    studentParentPhone: string({ required_error: studentParentPhone.required })
      .trim()
      .min(1, studentParentPhone.required)
      .regex(isPhone, studentParentPhone.invalid),
    notifyResultToParent: boolean().optional().nullable(),

    // Thông tin khoá học
    courseIds: array(string(), { required_error: course.required }).min(1, course.required),
    totalNumberSessions: number({ required_error: totalNumberSessions.required }),
    originPrice: number({ required_error: originPrice.required }).min(0, originPrice.required),
    salePrice: number({ required_error: salePrice.required }).min(0, originPrice.required),
    promotion: number({ required_error: promotion.required }).min(0, promotion.required),
    promotionType: enum_(['percentage', 'price']),
    paymentMethod: enum_([PaymentMethod.BANK, PaymentMethod.CASH, PaymentMethod.POS], {
      required_error: paymentMethod.required,
    }),

    // Thông tin học phí đóng tại IELTS ARENA
    benefitDeposit: number().min(0, benefitDeposit.min).optional().nullable(),
    receiptNumber: string().trim().or(literal('')).optional().nullable(),
    volumeNumber: string().trim().or(literal('')).optional().nullable(),

    firstTuitionFee: number({ required_error: firstTuitionFee.required }).min(0, firstTuitionFee.required),
    firstReceiptNumber: string({ required_error: firstReceiptNumber.required }).min(1, firstReceiptNumber.required),
    firstVolumeNumber: string({ required_error: firstVolumeNumber.required }).min(1, firstVolumeNumber.required),

    secondTuitionFee: number().min(0, secondTuitionFee.min).optional().nullable(),
    secondReceiptNumber: string().trim().or(literal('')).optional().nullable(),
    secondVolumeNumber: string().trim().or(literal('')).optional().nullable(),

    thirdTuitionFee: number().min(0, thirdTuitionFee.min).optional().nullable(),
    thirdReceiptNumber: string().trim().or(literal('')).optional().nullable(),
    thirdVolumeNumber: string().trim().or(literal('')).optional().nullable(),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'registration_form']>) => {
  return zodResolver(getFormMutationSchema(t));
};
