import { ActionType, ResourceType } from '~/packages/specific/Permission/Permission';

export const isCanEditDocumentTemplate = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.DOCUMENT_TEMPLATE,
  isMock: true,
};

export const isCanCreateDocumentTemplate = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.DOCUMENT_TEMPLATE,
  isMock: true,
};

export const isCanDeleteDocumentTemplate = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.DOCUMENT_TEMPLATE,
  isMock: true,
};

export const isCanReadDocumentTemplate = {
  actionType: ActionType.READ,
  resourceType: ResourceType.DOCUMENT_TEMPLATE,
  isMock: true,
};

export const isCanImportDocumentTemplate = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.DOCUMENT_TEMPLATE,
  isMock: true,
};

export const isCanExportDocumentTemplate = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.DOCUMENT_TEMPLATE,
  isMock: true,
};
