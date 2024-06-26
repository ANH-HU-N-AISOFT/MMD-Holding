import { zodResolver } from '@hookform/resolvers/zod';
import { enum as enum_, literal, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { calculateAge } from '~/utils/functions/calculateAge';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';
import { isPhone } from '~/utils/regexes';
import { isAddress } from '~/utils/regexes/src/isAddress';
import { isCitizenIdCard } from '~/utils/regexes/src/isCitizenIdCard';

export const getFormMutationSchema = (t: TFunction<['common', 'contract']>) => {
  const code = {
    required: getRequiredMessage(t, 'contract:code'),
  };
  const organizationName = {
    required: getRequiredMessage(t, 'contract:organization'),
  };

  const studentId = {
    required: getRequiredMessageSelectField(t, 'contract:student'),
  };
  const studentDateOfBirth = {
    required: getRequiredMessageSelectField(t, 'contract:student_date_of_birth'),
  };
  const studentPhone = {
    required: getRequiredMessage(t, 'contract:student_phone'),
    invalid: getInvalidMessage(t, 'contract:student_phone'),
  };
  const studentCitizenIdCard = {
    length: getRangeLengthMessage(t, 'contract:student_citizen_id_card', 8, 16),
    invalid: t('contract:citizen_id_card_invalid'),
  };
  const studentCurrentAddress = {
    required: getRequiredMessage(t, 'contract:student_current_address'),
    length: getRangeLengthMessage(t, 'contract:student_current_address', 3, 64),
    invalid: t('contract:student_current_address_invalid'),
  };

  const parentName = {
    required: getRequiredMessage(t, 'contract:parent'),
  };
  const parentPhone = {
    required: getRequiredMessage(t, 'contract:parent_phone'),
    invalid: getInvalidMessage(t, 'contract:parent_phone'),
  };
  const parentCitizenIdCard = {
    length: getRangeLengthMessage(t, 'contract:parent_citizen_id_card', 8, 16),
    invalid: t('contract:citizen_id_card_invalid'),
  };
  const parentCurrentAddress = {
    required: getRequiredMessage(t, 'contract:parent_current_address'),
    length: getRangeLengthMessage(t, 'contract:parent_current_address', 3, 64),
    invalid: t('contract:parent_current_address_invalid'),
  };

  return object({
    code: string({ required_error: code.required }).trim().min(1, code.required),
    organizationName: string({ required_error: organizationName.required }).min(1, organizationName.required),
    studentId: string({ required_error: studentId.required }),
    studentName: string(),
    studentPhone: string({ required_error: studentPhone.required })
      .trim()
      .min(1, studentPhone.required)
      .regex(isPhone, studentPhone.invalid),
    studentGender: enum_([GenderEnum.FEMALE, GenderEnum.MALE]).optional().nullable(),
    studentDateOfBirth: string({ required_error: studentDateOfBirth.required }),
    studentCitizenIdCard: string()
      .trim()
      .min(8, studentCitizenIdCard.length)
      .max(16, studentCitizenIdCard.length)
      .regex(isCitizenIdCard, studentCitizenIdCard.invalid)
      .optional()
      .or(literal(''))
      .nullable(),
    studentCitizenIdCardCreatedAt: string().trim().or(literal('')).optional().nullable(),
    studentCitizenIdCardCreatedWhere: string().trim().or(literal('')).optional().nullable(),
    studentCurrentAddress: string({ required_error: studentCurrentAddress.required })
      .trim()
      .min(3, studentCurrentAddress.length)
      .max(64, studentCurrentAddress.length)
      .regex(isAddress, studentCurrentAddress.invalid),

    parentName: string({ required_error: parentName.required })
      .trim()
      .min(1, parentName.required)
      .or(literal(''))
      .optional()
      .nullable(),
    parentPhone: string({ required_error: parentPhone.required })
      .trim()
      .min(1, parentPhone.required)
      .regex(isPhone, parentPhone.invalid)
      .trim()
      .or(literal(''))
      .optional()
      .nullable(),
    parentGender: enum_([GenderEnum.FEMALE, GenderEnum.MALE]).optional().nullable(),
    parentDateOfBirth: string().optional().nullable(),
    parentCitizenIdCard: string()
      .trim()
      .min(8, parentCitizenIdCard.length)
      .max(16, parentCitizenIdCard.length)
      .regex(isCitizenIdCard, parentCitizenIdCard.invalid)
      .optional()
      .or(literal(''))
      .nullable(),
    parentCitizenIdCardCreatedAt: string().trim().or(literal('')).optional().nullable(),
    parentCitizenIdCardCreatedWhere: string().trim().or(literal('')).optional().nullable(),
    parentCurrentAddress: string({ required_error: parentCurrentAddress.required })
      .trim()
      .min(3, parentCurrentAddress.length)
      .max(64, parentCurrentAddress.length)
      .regex(isAddress, parentCurrentAddress.invalid)
      .or(literal(''))
      .optional()
      .nullable(),
  })
    .refine(
      value => {
        if (value.studentDateOfBirth && calculateAge(value.studentDateOfBirth) <= 18) {
          return value.parentName && value.parentName.trim().length >= 1;
        }
        return true;
      },
      { message: parentName.required, path: ['parentName'] },
    )
    .refine(
      value => {
        if (value.studentDateOfBirth && calculateAge(value.studentDateOfBirth) <= 18) {
          return value.parentPhone && value.parentPhone.trim().length >= 1;
        }
        return true;
      },
      { message: parentPhone.required, path: ['parentPhone'] },
    )
    .refine(
      value => {
        if (value.studentDateOfBirth && calculateAge(value.studentDateOfBirth) <= 18) {
          return value.parentPhone && isPhone.test(value.parentPhone.trim());
        }
        return true;
      },
      { message: parentPhone.invalid, path: ['parentPhone'] },
    )
    .refine(
      value => {
        if (value.studentDateOfBirth && calculateAge(value.studentDateOfBirth) <= 18) {
          return !!value.parentCurrentAddress?.trim();
        }
        return true;
      },
      { message: parentCurrentAddress.required, path: ['parentCurrentAddress'] },
    )
    .refine(
      value => {
        if (value.studentDateOfBirth && calculateAge(value.studentDateOfBirth) <= 18) {
          return (
            !!value.parentCurrentAddress &&
            value.parentCurrentAddress.trim().length >= 3 &&
            value.parentCurrentAddress.trim().length <= 64
          );
        }
        return true;
      },
      { message: parentCurrentAddress.length, path: ['parentCurrentAddress'] },
    )
    .refine(
      value => {
        if (value.studentDateOfBirth && calculateAge(value.studentDateOfBirth) <= 18) {
          return !!value.parentCurrentAddress && isAddress.test(value.parentCurrentAddress);
        }
        return true;
      },
      { message: parentCurrentAddress.invalid, path: ['parentCurrentAddress'] },
    );
};

export const getFormMutationResolver = (t: TFunction<['common', 'contract']>) => {
  return zodResolver(getFormMutationSchema(t));
};
