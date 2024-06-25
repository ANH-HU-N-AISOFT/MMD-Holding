import { UrlSearchParamsUtils } from 'utilities';
import { any, enum as enum_, number, object } from 'zod';
import { CourseStatus } from '../../Course/models/CourseStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  status: enum_([CourseStatus.ACTIVE, CourseStatus.IN_ACTIVE]).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
