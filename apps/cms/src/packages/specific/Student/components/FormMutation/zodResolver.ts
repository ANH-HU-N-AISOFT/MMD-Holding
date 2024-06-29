import { zodResolver } from '@hookform/resolvers/zod';
import { array, boolean, enum as enum_, literal, object, string } from 'zod';

import { SourceEnum } from '../../models/SourceEnum';
import type { TFunction } from 'i18next';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';
import { isEmail, isPhone } from '~/utils/regexes';
import { isAddress } from '~/utils/regexes/src/isAddress';
import { isCitizenIdCard } from '~/utils/regexes/src/isCitizenIdCard';
import { isNameOfPerson } from '~/utils/regexes/src/isNameOfPerson';
import { isStrongPassword } from '~/utils/regexes/src/isStrongPassword';
import { isUserName } from '~/utils/regexes/src/isUserName';

export const getFormMutationSchema = ({
  needPassword,
  t,
}: {
  t: TFunction<['common', 'student']>;
  needPassword: boolean;
}) => {
  const username = {
    required: getRequiredMessage(t, 'student:username'),
    length: getRangeLengthMessage(t, 'student:username', 5, 12),
    invalid: t('student:username_invalid'),
  };
  const password = {
    required: getRequiredMessage(t, 'student:password'),
    length: getRangeLengthMessage(t, 'student:password', 8, 12),
    invalid: t('student:password_invalid'),
  };
  const accessStatus = {
    required: getRequiredMessageSelectField(t, 'student:access_status'),
  };

  const studentName = {
    required: getRequiredMessage(t, 'student:student_name'),
    length: getRangeLengthMessage(t, 'student:student_name', 1, 100),
    invalid: t('student:student_name_invalid'),
  };
  const studentPhone = {
    required: getRequiredMessage(t, 'student:student_phone'),
    invalid: getInvalidMessage(t, 'student:student_phone'),
  };
  const studentEmail = {
    invalid: getInvalidMessage(t, 'student:student_email'),
  };
  const studentCurrentAddress = {
    length: getRangeLengthMessage(t, 'student:student_current_address', 3, 64),
    invalid: t('student:student_current_address_invalid'),
  };
  const studentCitizenIdCard = {
    length: getRangeLengthMessage(t, 'student:student_citizen_id_card', 8, 16),
    invalid: t('student:citizen_id_card_invalid'),
  };
  const studentResidenceAddress = {
    required: getRequiredMessage(t, 'student:student_residence_address'),
    length: getRangeLengthMessage(t, 'student:student_residence_address', 3, 64),
    invalid: t('student:student_residence_address_invalid'),
  };

  const parentName = {
    required: getRequiredMessage(t, 'student:parent_name'),
    length: getRangeLengthMessage(t, 'student:parent_name', 1, 100),
    invalid: t('student:parent_name_invalid'),
  };
  const parentPhone = {
    invalid: getInvalidMessage(t, 'student:parent_phone'),
  };
  const parentCitizenIdCard = {
    length: getRangeLengthMessage(t, 'student:parent_citizen_id_card', 8, 16),
    invalid: t('student:citizen_id_card_invalid'),
  };
  const parentResidenceAddress = {
    required: getRequiredMessage(t, 'student:parent_residence_address'),
    length: getRangeLengthMessage(t, 'student:parent_residence_address', 3, 64),
    invalid: t('student:parent_residence_address_invalid'),
  };

  const departments = {
    required: t('student:department_invalid'),
  };

  return object({
    personalInformation: object({
      // Student
      studentName: string({ required_error: studentName.required })
        .trim()
        .min(1, studentName.length)
        .max(100, studentName.length)
        .regex(isNameOfPerson, studentName.invalid),
      studentPhone: string({ required_error: studentPhone.required })
        .trim()
        .min(1, studentPhone.required)
        .regex(isPhone, studentPhone.invalid),
      studentEmail: string()
        .trim()
        .refine(
          value => {
            if (value !== undefined && value !== null && value.trim() !== '') {
              return new RegExp(isEmail).test(value);
            }
            return true;
          },
          { message: studentEmail.invalid },
        )
        .optional()
        .or(literal(''))
        .nullable(),
      studentCurrentAddress: string()
        .trim()
        .min(3, studentCurrentAddress.length)
        .max(64, studentCurrentAddress.length)
        .regex(isAddress, studentCurrentAddress.invalid)
        .optional()
        .or(literal(''))
        .nullable(),
      studentCity: string().trim().optional().or(literal('')).nullable(),
      studentDistrict: string().trim().optional().or(literal('')).nullable(),
      studentSchool: string().trim().optional().nullable(),
      studentDateOfBirth: string().trim().optional().or(literal('')).nullable(),
      studentGender: enum_([GenderEnum.MALE, GenderEnum.FEMALE]).optional().nullable(),
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
      studentResidenceAddress: string({ required_error: studentResidenceAddress.required })
        .trim()
        .min(3, studentResidenceAddress.length)
        .max(64, studentResidenceAddress.length)
        .regex(isAddress, studentResidenceAddress.invalid)
        .or(literal(''))
        .optional()
        .nullable(),

      // Parent
      parentName: string({ required_error: parentName.required })
        .trim()
        .min(1, parentName.length)
        .max(100, parentName.length)
        .regex(isNameOfPerson, parentName.invalid)
        .or(literal(''))
        .optional()
        .nullable(),
      parentPhone: string()
        .trim()
        .refine(
          value => {
            if (value !== undefined && value !== null && value.trim() !== '') {
              return new RegExp(isPhone).test(value);
            }
            return true;
          },
          { message: parentPhone.invalid },
        )
        .optional()
        .or(literal(''))
        .nullable(),
      parentDateOfBirth: string().trim().optional().or(literal('')).nullable(),
      parentGender: enum_([GenderEnum.MALE, GenderEnum.FEMALE]).optional().nullable(),
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
      parentResidenceAddress: string({ required_error: parentResidenceAddress.required })
        .trim()
        .min(3, parentResidenceAddress.length)
        .max(64, parentResidenceAddress.length)
        .regex(isAddress, parentResidenceAddress.invalid)
        .or(literal(''))
        .optional()
        .nullable(),
      notifyResultToParent: boolean().optional().nullable(),

      // Department
      source: enum_([
        SourceEnum.Cold,
        SourceEnum.Communication,
        SourceEnum.HotWarm,
        SourceEnum.HumanResources,
        SourceEnum.DataMarketing,
        SourceEnum.Repeat,
      ])
        .optional()
        .nullable(),
      departments: array(string(), {
        required_error: departments.required,
      }).min(1, departments.required),
      saleEmployees: array(string()).optional().nullable(),
    }),
    roleSystem: object({
      username: string({ required_error: username.required })
        .trim()
        .min(5, username.length)
        .max(12, username.length)
        .regex(isUserName, username.invalid),
      accessStatus: enum_([SystemAccessStatus.BLOCKED, SystemAccessStatus.GRANTED], {
        required_error: accessStatus.required,
      }),
      password: needPassword
        ? string({ required_error: password.required })
            .min(8, password.length)
            .max(12, password.length)
            .regex(isStrongPassword, password.invalid)
        : string().trim().or(literal('')).optional().nullable(),
    }),
  });
};

export const getFormMutationResolver = ({
  needPassword,
  t,
}: {
  t: TFunction<['common', 'student']>;
  needPassword: boolean;
}) => {
  return zodResolver(getFormMutationSchema({ needPassword, t }));
};
