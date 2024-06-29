import { UrlSearchParamsUtils } from 'utilities';
import { any, number, object, string } from 'zod';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  createdAt: string().optional(),
  // type: enum_([DocumentTemplateType.CONTRACT, DocumentTemplateType.REGISTRATION_FORM]).optional(),
  // status: enum_([DocumentTemplateStatus.ACTIVE, DocumentTemplateStatus.IN_ACTIVE]).optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
