import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

export const isCanEditCourse = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.COURSE,
};

export const isCanCreateCourse = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.COURSE,
};

export const isCanDeleteCourse = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.COURSE,
};

export const isCanReadCourse = {
  actionType: ActionType.READ,
  resourceType: ResourceType.COURSE,
};

export const isCanImportCourse = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.COURSE,
};

export const isCanExportCourse = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.COURSE,
};
