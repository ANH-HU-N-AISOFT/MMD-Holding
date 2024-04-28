import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, string } from 'zod';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  pageSize: number().optional(),
  search: any().optional(),
  status: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
