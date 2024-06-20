import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

export const isCanEditCourseCombo = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.COURSE_COMBO,
};

export const isCanCreateCourseCombo = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.COURSE_COMBO,
};

export const isCanDeleteCourseCombo = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.COURSE_COMBO,
};

export const isCanReadCourseCombo = {
  actionType: ActionType.READ,
  resourceType: ResourceType.COURSE_COMBO,
};

export const isCanImportCourseCombo = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.COURSE_COMBO,
};

export const isCanExportCourseCombo = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.COURSE_COMBO,
};
