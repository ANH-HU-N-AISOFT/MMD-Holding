import { ActionType, ResourceType } from '~/packages/specific/Permission/Permission';

export const isCanEditStudent = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.STUDENT,
};

export const isCanCreateStudent = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.STUDENT,
};

export const isCanDeleteStudent = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.STUDENT,
};

export const isCanReadStudent = {
  actionType: ActionType.READ,
  resourceType: ResourceType.STUDENT,
};

export const isCanImportStudent = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.STUDENT,
};

export const isCanExportStudent = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.STUDENT,
};
