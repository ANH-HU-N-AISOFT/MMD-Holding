import { TFunction } from 'i18next';
import { boolean, object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormLoginZodSchema = (t: TFunction<['common', 'auth']>) => {
  const username = {
    required: getRequiredMessage(t, 'auth:username'),
  };
  const password = {
    required: getRequiredMessage(t, 'auth:password'),
  };
  return object({
    username: string({ required_error: username.required }).trim().min(1, { message: username.required }),
    password: string({ required_error: password.required }).min(1, { message: password.required }),
    remember: boolean().optional(),
  });
};
