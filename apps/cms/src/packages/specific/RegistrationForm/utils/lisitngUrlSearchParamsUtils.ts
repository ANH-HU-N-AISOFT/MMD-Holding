import { UrlSearchParamsUtils } from 'utilities';
import { any, array, number, object, string } from 'zod';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  createdAt: number().optional(),
  courseIds: array(string()).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
