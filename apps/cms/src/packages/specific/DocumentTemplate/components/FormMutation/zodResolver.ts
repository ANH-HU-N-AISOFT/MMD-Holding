import { zodResolver } from '@hookform/resolvers/zod';
import { custom, enum as enum_, literal, object, string } from 'zod';
import { DocumentTemplateStatus } from '../../models/DocumentTemplateStatus';
import { DocumentTemplateType } from '../../models/DocumentTemplateType';
import type { TFunction } from 'i18next';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'document_template']>) => {
  const type = {
    required: getRequiredMessageSelectField(t, 'document_template:document_template_type'),
  };
  const name = {
    required: getRequiredMessage(t, 'document_template:name'),
  };

  const file = {
    required: getRequiredMessageSelectField(t, 'document_template:file'),
  };

  const description = {
    length: getRangeLengthMessage(t, 'document_template:description', 0, 256),
  };

  return object({
    type: enum_([DocumentTemplateType.CONTRACT, DocumentTemplateType.REGISTRATION_FORM], {
      required_error: type.required,
    }),
    name: string({ required_error: name.required }).trim().min(1, name.required),
    file: custom<File | string>(v => v && (typeof v === 'string' || v instanceof File), { message: file.required }),
    status: enum_([DocumentTemplateStatus.ACTIVE, DocumentTemplateStatus.IN_ACTIVE]),
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

export const getFormMutationResolver = (t: TFunction<['common', 'document_template']>) => {
  return zodResolver(getFormMutationSchema(t));
};
