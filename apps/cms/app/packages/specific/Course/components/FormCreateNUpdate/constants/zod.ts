import { TFunction } from 'i18next';
import { any, object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getCreateCourseZodSchema = (t: TFunction<['common', 'courses'], undefined>) => {
  const title = {
    required: getRequiredMessage(t, 'courses:course_title'),
  };
  return object({
    title: string({ required_error: title.required }).trim().min(1, { message: title.required }),
    description: string().trim().optional(),
  });
};

export const getUpdateCourseZodSchema = (t: TFunction<['common', 'courses'], undefined>) => {
  const baseFields = getCreateCourseZodSchema(t);
  return baseFields.extend({
    _id: any(),
  });
};
