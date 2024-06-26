import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, enum as enum_, string } from 'zod';
import { FormStatus } from '../models/FormStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  status: enum_([
    FormStatus.Consulted,
    FormStatus.Failed,
    FormStatus.Trial,
    FormStatus.SalesClosed,
    FormStatus.UnderCare,
  ]).optional(),
  courseRoadmapId: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
