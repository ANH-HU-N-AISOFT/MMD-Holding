import { zodResolver } from '@hookform/resolvers/zod';
import { array, literal, number, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'discount']>) => {
  const name = {
    required: getRequiredMessage(t, 'discount:name'),
    length: getRangeLengthMessage(t, 'discount:name', 3, 64),
  };
  const code = {
    required: getRequiredMessage(t, 'discount:code'),
    length: getRangeLengthMessage(t, 'discount:code', 3, 8),
  };

  const note = {
    length: getRangeLengthMessage(t, 'discount:note', 0, 256),
  };
  return object({
    name: string({ required_error: name.required }).trim().min(3, name.length).max(64, name.length),
    code: string({ required_error: code.required }).trim().min(3, code.length).max(64, code.length),
    note: string().trim().min(0, note.length).max(256, note.length).trim().optional().or(literal('')).nullable(),
    status: string(),
    dateAvailable: array(string()),
    type: string(),
    promotion: number(),
    applyTo: string(),
    departments: array(string()),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'discount']>) => {
  return zodResolver(getFormMutationSchema(t));
};
