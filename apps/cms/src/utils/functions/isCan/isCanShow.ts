import { Session } from '~/packages/common/Auth/models/Session';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

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
