import { getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/specific/Employee/models/Employee';

interface IsCanShow {
  roles?: Role[];
  accept: Role[];
}

export const isCanShow = ({ roles = getSession()?.profile?.roles as Role[], accept }: IsCanShow) => {
  if (!roles?.length) {
    return false;
  }
  return accept.some(item => roles.includes(item));
};
