import { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/server-runtime';
import { authSessionStorage } from '~/packages/common/Auth/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await authSessionStorage.getSession(request);
    if (session.data.sessionData?.token) {
      return redirect('/dashboard');
    }
    return redirect('/login');
  } catch {
    return redirect('/login?expire=true');
  }
};

const Index = () => {
  return null;
};

export default Index;
