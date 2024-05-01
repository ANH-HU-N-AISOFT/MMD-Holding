import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string } from 'zod';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormResetPasswordResolver = (t: TFunction<['common', 'employee']>) => {
  const password = {
    required: getRequiredMessage(t, 'employee:password'),
    length: getRangeLengthMessage(t, 'employee:password', 8, 12),
    invalid: t('employee:password_invalid'),
  };
  return zodResolver(
    object({
      newPassword: string({ required_error: password.required })
        .min(8, password.length)
        .max(12, password.length)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&\s'-])[A-Za-z\d@$!%*?&\s'-]+$/, password.invalid),
      confirmPassword: string().optional(),
    }).refine(data => data.newPassword === data.confirmPassword, {
      message: t('employee:confirm_password_not_match'),
      path: ['confirmPassword'],
    }),
  );
};
