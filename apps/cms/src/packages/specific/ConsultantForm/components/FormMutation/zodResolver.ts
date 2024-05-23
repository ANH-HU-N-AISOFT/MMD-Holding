import { zodResolver } from '@hookform/resolvers/zod';
import { literal, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'consultant_form']>) => {
  const note = {
    length: getRangeLengthMessage(t, 'consultant_form:note', 0, 256),
  };
  return object({
    note: string().trim().min(0, note.length).max(256, note.length).trim().optional().or(literal('')).nullable(),
    status: string(),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'consultant_form']>) => {
  return zodResolver(getFormMutationSchema(t));
};
