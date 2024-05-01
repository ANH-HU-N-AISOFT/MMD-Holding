import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, string, enum as enum_ } from 'zod';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  businessStatus: string().optional(), // BusinessStatusEnum
  layout: enum_(['table', 'tree']).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
