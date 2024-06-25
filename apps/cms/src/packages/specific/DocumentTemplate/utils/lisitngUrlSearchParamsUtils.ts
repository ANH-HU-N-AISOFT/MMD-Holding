import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, enum as enum_ } from 'zod';
import { DocumentTemplateStatus } from '../models/DocumentTemplateStatus';
import { DocumentTemplateType } from '../models/DocumentTemplateType';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  createdAt: number().optional(),
  type: enum_([DocumentTemplateType.CONTRACT, DocumentTemplateType.REGISTRATION_FORM]).optional(),
  status: enum_([DocumentTemplateStatus.ACTIVE, DocumentTemplateStatus.IN_ACTIVE]).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
