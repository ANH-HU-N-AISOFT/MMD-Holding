import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, string } from 'zod';

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: object({
    page: number().optional(),
    pageSize: number().optional(),
    search: any().optional(),
    status: string().optional(),
  }),
});
