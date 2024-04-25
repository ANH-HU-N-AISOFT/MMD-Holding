import { FC } from 'react';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { redirect } from '~/overrides/@remix';
import { getSession } from '~/packages/common/Auth/sessionStorage';

export const loader = () => {
  const isLoggedIn = getSession();
  if (isLoggedIn) {
    return redirect('/');
  }
  return null;
};

export const Page: FC = () => {
  return <AuthLayout />;
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
