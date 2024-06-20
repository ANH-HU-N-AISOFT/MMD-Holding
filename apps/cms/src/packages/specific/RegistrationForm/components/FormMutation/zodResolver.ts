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
    required: getRequiredMessage(t, 'registration_form:current_address'),
    length: getRangeLengthMessage(t, 'registration_form:current_address', 3, 64),
    invalid: getInvalidMessage(t, 'registration_form:current_address'),
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
    required: getRequiredMessageSelectField(t, 'registration_form:fee_origin'),
  };
  const salePrice = {
    required: getRequiredMessageSelectField(t, 'registration_form:fee_after_apply_promotion'),
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
  const commitmentCompletionDate = {
    required: getRequiredMessageSelectField(t, 'registration_form:commitment_completion_date'),
  };
  const notes = {
    length: getRangeLengthMessage(t, 'registration_form:notes', 0, 256),
  };

  return object({
    code: string({ required_error: code.required }).trim().min(1, code.required),
    studentId: string({ required_error: studentId.required }),
    studentName: string(),
    studentPhone: string({ required_error: studentPhone.required })
      .trim()
      .min(1, studentPhone.required)
      .regex(isPhone, studentPhone.invalid),
    studentEmail: string({ required_error: studentEmail.required }).trim().regex(isEmail, studentEmail.invalid),
    studentDateOfBirth: string().optional().nullable(),
    studentGender: enum_([GenderEnum.FEMALE, GenderEnum.MALE]).optional().nullable(),
    studentCurrentAddress: string({ required_error: studentCurrentAddress.required })
      .trim()
      .min(3, studentCurrentAddress.length)
      .max(64, studentCurrentAddress.length)
      .regex(/^[\p{L}0-9\s/]*$/u, studentCurrentAddress.invalid),
    studentCityName: string().trim().optional().or(literal('')).nullable(),
    studentCityId: string().optional().nullable(),
    studentCityCode: string().optional().nullable(),
    studentDistrict: string().optional().nullable(),
    studentParentPhone: string({ required_error: studentParentPhone.required })
      .trim()
      .min(1, studentParentPhone.required)
      .regex(isPhone, studentParentPhone.invalid),
    notifyResultToParent: boolean().optional().nullable(),

    // Thông tin khoá học
    courses: array(
      object({
        id: string(),
        name: string(),
        numberSession: number(),
      }),
      { required_error: course.required },
    ).min(1, course.required),
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

    commitmentCompletionDate: string({ required_error: commitmentCompletionDate.required }),
    notes: string().trim().min(0, notes.length).max(256, notes.length).trim().optional().or(literal('')).nullable(),

    registrationDateOfProgramChange: string().optional().nullable(),
    newDiscountOfProgramChange: string().optional().nullable(),
    newTuitionFeeOfProgramChange: number().optional().nullable(),
    registrationDateOfCourseChange: string().optional().nullable(),
    newDiscountOfCourseChange: string().optional().nullable(),
    newTuitionFeeOfCourseChange: number().optional().nullable(),
    registrationDateOfAdditionalCourseRegistration1: string().optional().nullable(),
    additionalCourseOfAdditionalCourseRegistration1: string().optional().nullable(),
    additionalTuitionFeeOfAdditionalCourseRegistration1: number().optional().nullable(),
    registrationDateOfAdditionalCourseRegistration2: string().optional().nullable(),
    additionalCourseOfAdditionalCourseRegistration2: string().optional().nullable(),
    additionalTuitionFeeOfAdditionalCourseRegistration2: number().optional().nullable(),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'registration_form']>) => {
  return zodResolver(getFormMutationSchema(t));
};
