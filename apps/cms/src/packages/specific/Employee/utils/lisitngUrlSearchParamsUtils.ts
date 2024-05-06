import { UrlSearchParamsUtils } from 'utilities';
import { number, object, string } from 'zod';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: string().optional(),
  status: string().optional(),
  department: string().optional(),
  roles: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
