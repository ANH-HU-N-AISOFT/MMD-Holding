import { UrlSearchParamsUtils } from 'utilities';
import { object, string } from 'zod';

export const createUrlSearchParamsSchema = object({
  studentId: string().optional(),
});

export const createUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: createUrlSearchParamsSchema,
});
