import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

export const isCanEditContract = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanCreateContract = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanDeleteContract = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanReadContract = {
  actionType: ActionType.READ,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanImportContract = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.COURSE,
  isMock: true,
};

export const isCanExportContract = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.COURSE,
  isMock: true,
};
