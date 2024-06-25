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
import { isStrongPassword } from '~/utils/regexes/src/isStrongPassword';

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

  return object({
    personalInformation: object({
      fullName: string({ required_error: fullName.required })
        .trim()
        .min(1, fullName.length)
        .max(100, fullName.length)
        .regex(/^[\p{L}\-'\s]*$/u, fullName.invalid),
      phone: string({ required_error: phone.required }).trim().min(1, phone.required).regex(isPhone, phone.invalid),
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
        .trim()
        .min(3, currentAddress.length)
        .max(64, currentAddress.length)
        .regex(/^[\p{L}0-9\s/]*$/u, currentAddress.invalid)
        .optional()
        .or(literal(''))
        .nullable(),
      city: string().trim().optional().or(literal('')).nullable(),
      district: string().trim().optional().or(literal('')).nullable(),
      dateOfBirth: string().trim().optional().or(literal('')).nullable(),
      school: string().trim().optional().nullable(),
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
        .regex(/^[\p{L}0-9]*$/u, username.invalid),
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
