import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';

interface IsCanAccess {
  accept: Role[];
  not?: Role[];
}

export const isCanAccessRoute = async (_: IsCanAccess) => {
  // let roles: string[] = [];
  // try {
  //   const session = getSession();
  //   roles = session?.profile?.roles ?? [];
  // } catch {
  //   return destroySession();
  // }
  // if (!roles.length || !accept.some(item => roles.includes(item)) || not.some(item => roles.includes(item))) {
  //   throw redirect('/403', {});
  // }
  return true;
};
