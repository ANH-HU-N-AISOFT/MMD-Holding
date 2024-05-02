import { redirect } from '~/overrides/@remix';
import { destroySession, getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';

interface IsCanAccess {
  accept: Role[];
}

export const isCanAccessRoute = async ({ accept }: IsCanAccess) => {
  try {
    const session = getSession();
    const roles = session?.profile?.roles;
    if (!roles?.length || !accept.some(item => roles.includes(item))) {
      return redirect('/403', {});
    }
    return true;
  } catch {
    return destroySession();
  }
};
