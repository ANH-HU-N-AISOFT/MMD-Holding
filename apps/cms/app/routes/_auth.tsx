import { redirect } from '@remix-run/server-runtime';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { AuthLayout } from '~/layouts/AuthLayout/AuthLayout';
import { authSessionStorage } from '~/packages/common/Auth/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authSessionStorage.getSession(request);

  if (session.data.sessionData) {
    return redirect('/');
  }

  return null;
};

const AuthLayoutRoot = () => {
  return <AuthLayout />;
};

export default AuthLayoutRoot;
