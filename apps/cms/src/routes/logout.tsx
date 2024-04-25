import { redirect } from '~/overrides/@remix';
import { destroySession } from '~/packages/common/Auth/sessionStorage';

export const action = () => {
  destroySession();
  return redirect('/login', {});
};

export const loader = () => {
  destroySession();
  return redirect('/login', {});
};
