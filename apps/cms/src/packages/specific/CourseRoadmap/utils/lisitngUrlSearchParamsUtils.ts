import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, string, enum as enum_ } from 'zod';
import { CourseStatus } from '../../Course/models/CourseStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  status: enum_([CourseStatus.ACTIVE, CourseStatus.IN_ACTIVE]).optional(),
  courseId: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
