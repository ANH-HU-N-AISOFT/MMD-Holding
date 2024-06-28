import { UrlSearchParamsUtils } from 'utilities';
import { any, array, number, object, string } from 'zod';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  departments: array(string()).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
