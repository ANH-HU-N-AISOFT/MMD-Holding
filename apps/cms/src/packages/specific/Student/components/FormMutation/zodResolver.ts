import { zodResolver } from '@hookform/resolvers/zod';
import { array, boolean, enum as enum_, literal, object, string } from 'zod';

import type { TFunction } from 'i18next';
import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';
import { isEmail, isPhone } from '~/utils/regexes';

export const getFormMutationResolver = ({
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
  const roleSystemSchema = object({
    username: string({ required_error: username.required })
      .min(5, username.length)
      .max(12, username.length)
      .regex(/^[\p{L}0-9]*$/u, username.invalid),
    accessStatus: enum_([EmployeeAccessStatus.BLOCKED, EmployeeAccessStatus.GRANTED], {
      required_error: accessStatus.required,
    }),
  });

  const fullName = {
    required: getRequiredMessage(t, 'student:fullName'),
    length: getRangeLengthMessage(t, 'student:fullName', 1, 100),
    invalid: t('student:full_name_invalid'),
  };
  const phone = {
    required: getRequiredMessage(t, 'student:phone'),
    invalid: getInvalidMessage(t, 'student:phone'),
  };
  const email = {
    invalid: getInvalidMessage(t, 'student:email'),
  };
  const currentAddress = {
    length: getRangeLengthMessage(t, 'student:current_address', 3, 64),
    invalid: t('student:current_address_invalid'),
  };
  const parentPhone = {
    invalid: getInvalidMessage(t, 'student:parent_phone'),
  };
  const departments = {
    required: t('student:department_invalid'),
  };

  return zodResolver(
    object({
      personalInformation: object({
        fullName: string({ required_error: fullName.required })
          .min(1, fullName.length)
          .max(100, fullName.length)
          .regex(/^[\p{L}\-'\s]*$/u, fullName.invalid)
          .trim(),
        phone: string({ required_error: phone.required }).min(1, phone.required).regex(isPhone, phone.invalid).trim(),
        email: string()
          .trim()
          .refine(
            value => {
              if (value !== undefined && value !== null && value.trim() !== '') {
                return new RegExp(isEmail).test(value);
              }
              return true;
            },
            { message: email.invalid },
          )
          .optional()
          .or(literal(''))
          .nullable(),
        currentAddress: string()
          .min(3, currentAddress.length)
          .max(64, currentAddress.length)
          .regex(/^[\p{L}0-9\s/]*$/u, currentAddress.invalid)
          .trim()
          .optional()
          .or(literal(''))
          .nullable(),
        city: string().trim().optional().or(literal('')).nullable(),
        district: string().trim().optional().or(literal('')).nullable(),
        dateOfBirth: string().trim().optional().or(literal('')).nullable(),
        school: string().optional().nullable(),
        gender: enum_([GenderEnum.MALE, GenderEnum.FEMALE]).optional().nullable(),
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
        notifyResultToParent: boolean().optional().nullable(),
        source: enum_([SourceEnum.Cold, SourceEnum.Communication, SourceEnum.HotWarm, SourceEnum.HumanResources])
          .optional()
          .nullable(),
        departments: array(string(), {
          required_error: departments.required,
        }).min(1, departments.required),
        saleEmployees: array(string()).optional().nullable(),
      }),
      roleSystem: needPassword
        ? roleSystemSchema.extend({
            password: string({ required_error: password.required })
              .min(8, password.length)
              .max(12, password.length)
              .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&\s'-])[A-Za-z\d@$!%*?&\s'-]+$/, password.invalid),
          })
        : roleSystemSchema,
    }),
  );
};
