import { UrlSearchParamsUtils } from 'utilities';
import { number, object, string, enum as enum_ } from 'zod';
import { WorkStatus } from '../models/WorkStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: string().optional(),
  status: enum_([
    WorkStatus.MATERNITY_LEAVE,
    WorkStatus.TERMINATED,
    WorkStatus.UNPAID_LEAVE,
    WorkStatus.WORKING,
  ]).optional(),
  department: string().optional(),
  roles: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
