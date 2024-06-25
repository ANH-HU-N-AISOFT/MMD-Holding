import { ActionType, ResourceType } from '~/packages/specific/Permission/Permission';

export const isCanEditCourseRoadmap = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.COURSE_ROADMAP,
};

export const isCanCreateCourseRoadmap = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.COURSE_ROADMAP,
};

export const isCanDeleteCourseRoadmap = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.COURSE_ROADMAP,
};

export const isCanReadCourseRoadmap = {
  actionType: ActionType.READ,
  resourceType: ResourceType.COURSE_ROADMAP,
};

export const isCanImportCourseRoadmap = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.COURSE_ROADMAP,
};

export const isCanExportCourseRoadmap = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.COURSE_ROADMAP,
};
