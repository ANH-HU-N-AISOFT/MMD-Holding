import { UrlSearchParamsUtils } from 'utilities';
import { number, object, string } from 'zod';

export const urlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: object({
    page: number().optional(),
    pageSize: number().optional(),
    search: string().optional(),
    status: string().optional(),
  }),
});
