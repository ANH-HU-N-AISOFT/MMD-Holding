import { redirect } from '~/overrides/@remix';
import { Session } from '~/packages/common/Auth/models/Session';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';

interface IsCanAccess {
  actionType: ActionType;
  resourceType: ResourceType;
  permissionsOfUser?: Session['permissions'];
  isMock?: boolean;
}

export const isCanAccessRoute = async ({ actionType, resourceType, permissionsOfUser, isMock }: IsCanAccess) => {
  if (isMock) {
    return;
  }
  const permissionsOfUser_ = permissionsOfUser ?? getSession()?.permissions;
  const isCanAccess = !!permissionsOfUser_?.find(
    item => item.actionType === actionType && item.resourceType === resourceType,
  );
  if (!isCanAccess) {
    throw redirect('/403', {});
  }
};
