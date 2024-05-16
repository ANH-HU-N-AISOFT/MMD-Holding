import { zodResolver } from '@hookform/resolvers/zod';
import { literal, object, string, enum as enum_ } from 'zod';
import type { TFunction } from 'i18next';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'course']>) => {
  const name = {
    required: getRequiredMessage(t, 'course:name'),
    length: getRangeLengthMessage(t, 'course:name', 3, 32),
  };

  const description = {
    length: getRangeLengthMessage(t, 'course:description', 0, 256),
  };
  return object({
    name: string({ required_error: name.required }).trim().min(3, name.length).max(32, name.length),
    status: enum_([CourseStatus.ACTIVE, CourseStatus.IN_ACTIVE]),
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

export const getFormMutationResolver = (t: TFunction<['common', 'course']>) => {
  return zodResolver(getFormMutationSchema(t));
};
