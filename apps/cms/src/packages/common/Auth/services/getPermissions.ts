import { ActionType, ResourceType } from '../../SelectVariants/Permission/Permission';

export interface GetPermissionsResponseSuccess {
  items?: Array<{
    actionType: ActionType;
    resourceType: ResourceType;
  }>;
}

export const getPermissionsEndpoint = '/permissions';
