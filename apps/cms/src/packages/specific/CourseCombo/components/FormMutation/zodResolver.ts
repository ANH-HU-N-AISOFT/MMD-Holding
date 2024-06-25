import { zodResolver } from '@hookform/resolvers/zod';
import { literal, object, string, enum as enum_, number, array } from 'zod';
import type { TFunction } from 'i18next';
import { CourseStatus } from '~/packages/specific/Course/models/CourseStatus';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'course_combo']>) => {
  const name = {
    required: getRequiredMessage(t, 'course_combo:name'),
    length: getRangeLengthMessage(t, 'course_combo:name', 3, 32),
  };
  const courseRoadmapIds = {
    required: getRequiredMessageSelectField(t, 'course_combo:course_roadmap'),
  };
  // const totalNumberSessions = {
  //   required: getRequiredMessage(t, 'course_combo:number_session'),
  // };
  // const totalSessionDuration = {
  //   required: getRequiredMessage(t, 'course_combo:session_duration'),
  // };
  // const totalPrice = {
  //   required: getRequiredMessage(t, 'course_combo:fee'),
  // };

  const description = {
    length: getRangeLengthMessage(t, 'course_combo:description', 0, 256),
  };
  return object({
    name: string({ required_error: name.required }).trim().min(3, name.length).max(32, name.length),
    courseRoadmapIds: array(string(), { required_error: courseRoadmapIds.required }).min(1, courseRoadmapIds.required),
    totalNumberSessions: number().optional().nullable(),
    totalPrice: number().optional().nullable(),

    displayTotalSessionDuration: string().optional().nullable(),
    // totalNumberSessions: number({ required_error: totalNumberSessions.required }).min(0, totalNumberSessions.required),
    // totalSessionDuration: number({ required_error: totalSessionDuration.required }).min(
    //   0,
    //   totalSessionDuration.required,
    // ),
    // totalPrice: number({ required_error: totalPrice.required }).min(0, totalPrice.required),
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

export const getFormMutationResolver = (t: TFunction<['common', 'course_combo']>) => {
  return zodResolver(getFormMutationSchema(t));
};
