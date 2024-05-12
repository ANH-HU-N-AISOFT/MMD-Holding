import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, string, enum as enum_ } from 'zod';
import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  status: enum_([
    'all',
    AppointmentStatus.ARRIVED_AT_CENTER,
    AppointmentStatus.CANCELED,
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.LEVEL_TESTED,
    AppointmentStatus.SCHEDULED,
  ]).optional(),
  organizationId: string().optional(),
  date: string().optional(),
  testShiftId: string().optional(),
  test: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});