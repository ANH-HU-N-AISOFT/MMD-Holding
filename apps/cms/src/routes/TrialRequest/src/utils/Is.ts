import { ActionType, ResourceType } from '~/packages/specific/Permission/Permission';

export const isCanEditTrialRequest = {
  actionType: ActionType.UPDATE,
  resourceType: ResourceType.TRIAL_REQUEST,
};

export const isCanCreateTrialRequest = {
  actionType: ActionType.CREATE,
  resourceType: ResourceType.TRIAL_REQUEST,
};

export const isCanDeleteTrialRequest = {
  actionType: ActionType.DELETE,
  resourceType: ResourceType.TRIAL_REQUEST,
};

export const isCanReadTrialRequest = {
  actionType: ActionType.READ,
  resourceType: ResourceType.TRIAL_REQUEST,
};

export const isCanImportTrialRequest = {
  actionType: ActionType.IMPORT,
  resourceType: ResourceType.TRIAL_REQUEST,
};

export const isCanExportTrialRequest = {
  actionType: ActionType.EXPORT,
  resourceType: ResourceType.TRIAL_REQUEST,
};
