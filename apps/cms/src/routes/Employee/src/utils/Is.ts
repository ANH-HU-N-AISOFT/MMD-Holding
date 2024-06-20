import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

export const isCanEditEmployee = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.EMPLOYEE,
};

export const isCanCreateEmployee = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.EMPLOYEE,
};

export const isCanDeleteEmployee = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.EMPLOYEE,
};

export const isCanReadEmployee = {
  actionType: ActionType.READ,
  resourceType: ResourceType.EMPLOYEE,
};

export const isCanImportEmployee = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.EMPLOYEE,
};

export const isCanExportEmployee = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.EMPLOYEE,
};
