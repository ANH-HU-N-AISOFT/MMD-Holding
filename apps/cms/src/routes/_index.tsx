import { RootLayout } from '~/layouts/RootLayout/RootLayout';
import { LoaderFunctionArgs, redirect } from '~/overrides/remix';
import { getSession } from '~/packages/common/Auth/sessionStorage';

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === '/') {
    const isLoggedIn = getSession();
    if (isLoggedIn) {
      return redirect('/dashboard', {});
    }
  }
  return null;
};

export const Page = () => {
  return <RootLayout />;
};
