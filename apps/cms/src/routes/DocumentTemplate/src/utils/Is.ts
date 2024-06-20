import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

// FIXME: Fix resource type
export const isCanEditDocumentTemplate = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.ORGANIZATION,
  isMock: true,
};

export const isCanCreateDocumentTemplate = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.ORGANIZATION,
  isMock: true,
};

export const isCanDeleteDocumentTemplate = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.ORGANIZATION,
  isMock: true,
};

export const isCanReadDocumentTemplate = {
  actionType: ActionType.READ,
  resourceType: ResourceType.ORGANIZATION,
  isMock: true,
};

export const isCanImportDocumentTemplate = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.ORGANIZATION,
  isMock: true,
};

export const isCanExportDocumentTemplate = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.ORGANIZATION,
  isMock: true,
};
