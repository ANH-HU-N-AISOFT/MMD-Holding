import { destroySession } from '~/packages/common/Auth/sessionStorage';

export const action = () => {
  destroySession();
  return null;
};

export const loader = () => {
  // destroySession();
  return null;
};
