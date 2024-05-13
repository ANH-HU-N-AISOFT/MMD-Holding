import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { literal, object, string } from 'zod';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { isStrongPassword } from '~/utils/regexes/src/isStrongPassword';

export const getFormResetPasswordSchema = (t: TFunction<['common', 'student']>) => {
  const password = {
    required: getRequiredMessage(t, 'student:password'),
    length: getRangeLengthMessage(t, 'student:password', 8, 12),
    invalid: t('student:password_invalid'),
  };
  return object({
    newPassword: string({ required_error: password.required })
      .min(8, password.length)
      .max(12, password.length)
      .regex(isStrongPassword, password.invalid),
    confirmPassword: string().optional().or(literal('')).nullable(),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: t('student:confirm_password_not_match'),
    path: ['confirmPassword'],
  });
};

export const getFormResetPasswordResolver = (t: TFunction<['common', 'student']>) => {
  return zodResolver(getFormResetPasswordSchema(t));
};
