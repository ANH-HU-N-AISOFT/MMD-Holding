import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';

interface IsCanShow {
  roles?: Role[];
  accept: Role[];
  not?: Role[];
}

export const isCanShow = (_: IsCanShow) => {
  // if (!roles?.length) {
  //   return false;
  // }
  // return accept.some(item => roles.includes(item)) || not.some(item => roles.includes(item));
  return true;
};
