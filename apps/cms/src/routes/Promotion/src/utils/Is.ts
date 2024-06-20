import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

export const isCanEditPromotion = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.PROMOTION,
};

export const isCanCreatePromotion = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.PROMOTION,
};

export const isCanDeletePromotion = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.PROMOTION,
};

export const isCanReadPromotion = {
  actionType: ActionType.READ,
  resourceType: ResourceType.PROMOTION,
};

export const isCanImportPromotion = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.PROMOTION,
};

export const isCanExportPromotion = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.PROMOTION,
};
