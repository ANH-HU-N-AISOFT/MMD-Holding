import { zodResolver } from '@hookform/resolvers/zod';
import { literal, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'contract_template']>) => {
  const name = {
    required: getRequiredMessage(t, 'contract_template:name'),
  };

  const file = {
    required: getRequiredMessageSelectField(t, 'contract_template:file'),
  };

  const description = {
    length: getRangeLengthMessage(t, 'contract_template:description', 0, 256),
  };

  return object({
    name: string({ required_error: name.required }).trim().min(1, name.required),
    file: string({ required_error: file.required }),
    description: string()
      .trim()
      .min(0, description.length)
      .max(256, description.length)
      .trim()
      .optional()
      .or(literal(''))
      .nullable(),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'contract_template']>) => {
  return zodResolver(getFormMutationSchema(t));
};
