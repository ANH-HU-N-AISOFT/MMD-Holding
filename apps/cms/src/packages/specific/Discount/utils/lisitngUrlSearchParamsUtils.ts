import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object } from 'zod';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
