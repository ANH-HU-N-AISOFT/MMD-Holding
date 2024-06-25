import { ActionType, ResourceType } from '~/packages/specific/Permission/Permission';

export const isCanEditDepartment = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.ORGANIZATION,
};

export const isCanCreateDepartment = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.ORGANIZATION,
};

export const isCanDeleteDepartment = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.ORGANIZATION,
};

export const isCanReadDepartment = {
  actionType: ActionType.READ,
  resourceType: ResourceType.ORGANIZATION,
};

export const isCanImportDepartment = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.ORGANIZATION,
};

export const isCanExportDepartment = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.ORGANIZATION,
};
