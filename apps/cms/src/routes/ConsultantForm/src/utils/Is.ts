import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

export const isCanEditConsultantForm = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.CONSULTATION,
};

export const isCanCreateConsultantForm = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.CONSULTATION,
};

export const isCanDeleteConsultantForm = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.CONSULTATION,
};

export const isCanReadConsultantForm = {
  actionType: ActionType.READ,
  resourceType: ResourceType.CONSULTATION,
};

export const isCanImportConsultantForm = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.CONSULTATION,
};

export const isCanExportConsultantForm = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.CONSULTATION,
};
