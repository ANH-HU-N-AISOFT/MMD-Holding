import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

export const isCanEditRegistrationForm = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanCreateRegistrationForm = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanDeleteRegistrationForm = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanReadRegistrationForm = {
  actionType: ActionType.READ,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanImportRegistrationForm = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanExportRegistrationForm = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.COURSE,
  isMock: true,
};
