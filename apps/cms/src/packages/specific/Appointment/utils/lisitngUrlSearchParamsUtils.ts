import { UrlSearchParamsUtils } from 'utilities';
import { any, boolean, enum as enum_, number, object, string } from 'zod';
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
  isOwner: boolean().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
