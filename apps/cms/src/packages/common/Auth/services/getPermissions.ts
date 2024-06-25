import { ActionType, ResourceType } from '../../../specific/Permission/Permission';

export interface GetPermissionsResponseSuccess {
  items?: Array<{
    actionType: ActionType;
    resourceType: ResourceType;
  }>;
}

export const getPermissionsEndpoint = '/permissions';
