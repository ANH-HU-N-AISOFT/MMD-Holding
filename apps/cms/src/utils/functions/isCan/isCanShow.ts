import { getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';

interface IsCanShow {
  roles?: Role[];
  accept: Role[];
  not?: Role[];
}

export const isCanShow = ({ roles = getSession()?.profile?.roles as Role[], accept, not = [] }: IsCanShow) => {
  if (!roles?.length) {
    return false;
  }
  return accept.some(item => roles.includes(item)) || not.some(item => roles.includes(item));
};
