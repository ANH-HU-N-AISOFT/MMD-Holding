import { UrlSearchParamsUtils } from 'utilities';
import { number, object, string, enum as enum_ } from 'zod';
import { EmployeeStatus } from '../models/EmployeeStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: string().optional(),
  status: enum_([
    EmployeeStatus.MATERNITY_LEAVE,
    EmployeeStatus.TERMINATED,
    EmployeeStatus.UNPAID_LEAVE,
    EmployeeStatus.WORKING,
  ]).optional(),
  department: string().optional(),
  roles: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
