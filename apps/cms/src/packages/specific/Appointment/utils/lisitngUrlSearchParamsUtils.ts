import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, string, enum as enum_, boolean } from 'zod';
import { AppointmentStatus } from '../models/AppointmentStatus';

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
  isOwner: boolean().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
