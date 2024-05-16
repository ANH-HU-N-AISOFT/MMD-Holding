import { zodResolver } from '@hookform/resolvers/zod';
import { literal, object, string, enum as enum_, number } from 'zod';
import type { TFunction } from 'i18next';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'course_roadmap']>) => {
  const name = {
    required: getRequiredMessage(t, 'course_roadmap:name'),
    length: getRangeLengthMessage(t, 'course_roadmap:name', 3, 32),
  };
  const code = {
    required: getRequiredMessage(t, 'course_roadmap:code'),
    length: getRangeLengthMessage(t, 'course_roadmap:code', 1, 8),
  };
  const courseId = {
    required: getRequiredMessageSelectField(t, 'course_roadmap:course'),
  };
  const numberSessions = {
    required: getRequiredMessage(t, 'course_roadmap:number_session'),
  };
  const sessionDuration = {
    required: getRequiredMessage(t, 'course_roadmap:session_duration'),
  };
  const price = {
    required: getRequiredMessage(t, 'course_roadmap:fee'),
  };

  const description = {
    length: getRangeLengthMessage(t, 'course_roadmap:description', 0, 256),
  };
  return object({
    name: string({ required_error: name.required }).trim().min(3, name.length).max(32, name.length),
    code: string({ required_error: code.required }).trim().min(1, code.length).max(8, code.length),
    courseId: string({ required_error: courseId.required }),
    numberSessions: number({ required_error: numberSessions.required }).min(0, numberSessions.required),
    sessionDuration: number({ required_error: sessionDuration.required }).min(0, sessionDuration.required),
    price: number({ required_error: price.required }).min(0, price.required),
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

export const getFormMutationResolver = (t: TFunction<['common', 'course_roadmap']>) => {
  return zodResolver(getFormMutationSchema(t));
};
