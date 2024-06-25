import { UrlSearchParamsUtils } from 'utilities';
import { any, enum as enum_, number, object } from 'zod';
import { BusinessStatusEnum } from '../models/BusinessStatusEnum';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  businessStatus: enum_([
    BusinessStatusEnum.ACTIVE,
    BusinessStatusEnum.COMING_SOON,
    BusinessStatusEnum.PERMANENTLY_CLOSED,
    BusinessStatusEnum.TEMPORARILY_CLOSED,
  ]).optional(),
  layout: enum_(['table', 'tree']).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
