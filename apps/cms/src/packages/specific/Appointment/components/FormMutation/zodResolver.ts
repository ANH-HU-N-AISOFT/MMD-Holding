import { zodResolver } from '@hookform/resolvers/zod';
import { object } from 'zod';
import type { TFunction } from 'i18next';

export const getFormMutationResolver = (_: TFunction<['common', 'appointment']>) => {
  return zodResolver(object({}));
};
