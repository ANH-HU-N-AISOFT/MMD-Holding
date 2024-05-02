import { zodResolver } from '@hookform/resolvers/zod';
import { literal, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { getInvalidMessage } from '~/utils/functions/getInvalidMessage';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { isEmail, isPhone } from '~/utils/regexes';

export const getFormMutationResolver = (t: TFunction<['common', 'department']>) => {
  const name = {
    required: getRequiredMessage(t, 'department:name'),
    length: getRangeLengthMessage(t, 'department:name', 3, 32),
  };

  const code = {
    required: getRequiredMessage(t, 'department:code'),
    length: getRangeLengthMessage(t, 'department:code', 2, 12),
    invalid: t('department:field_code_invalid'),
  };
  const manageDepartmentId = {
    required: t('department:manage_department_invalid'),
  };
  const address = {
    length: getRangeLengthMessage(t, 'department:address', 3, 64),
  };
  const phone = {
    invalid: getInvalidMessage(t, 'department:phone'),
  };
  const email = {
    invalid: getInvalidMessage(t, 'department:email'),
  };

  return zodResolver(
    object({
      name: string({ required_error: name.required }).trim().min(3, name.length).max(32, name.length),
      code: string({ required_error: code.required })
        .trim()
        .min(2, code.length)
        .max(12, code.length)
        .refine(
          value => {
            return /^[^\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(value);
          },
          { message: code.invalid },
        ),
      manageDepartmentId: string({ required_error: manageDepartmentId.required }),
      businessStatus: string(),
      address: string().min(3, address.length).max(64, address.length).optional().or(literal('')).nullable(),
      city: string().optional().or(literal('')).nullable(),
      phone: string()
        .trim()
        .refine(
          value => {
            if (value !== undefined && value !== null && value.trim() !== '') {
              return new RegExp(isPhone).test(value);
            }
            return true;
          },
          { message: phone.invalid },
        )
        .optional()
        .or(literal(''))
        .nullable(),
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
      presentDepartmentId: string().optional().or(literal('')).nullable(),
      foundationDate: string().optional().or(literal('')).nullable(),
    }),
  );
};
