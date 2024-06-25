import { ActionType, ResourceType } from '../Permission';
import { Session } from '~/packages/common/Auth/models/Session';
import { getSession } from '~/packages/common/Auth/sessionStorage';

interface IsCanShow {
  actionType: ActionType;
  resourceType: ResourceType;
  permissionsOfUser?: Session['permissions'];
  isMock?: boolean;
}

export const isCanShow = ({ actionType, resourceType, permissionsOfUser, isMock }: IsCanShow) => {
  if (isMock) {
    return true;
  }
  const permissionsOfUser_ = permissionsOfUser ?? getSession()?.permissions;
  return !!permissionsOfUser_?.find(item => item.actionType === actionType && item.resourceType === resourceType);
};
