import { useEffect } from 'react';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { DashboardLayout } from '~/layouts/DashboardLayout/DashboardLayout';
import { json, redirect, useLoaderData, useNavigate } from '~/overrides/@remix';
import { Session } from '~/packages/common/Auth/models/Session';
import { getSession } from '~/packages/common/Auth/sessionStorage';

export interface LoaderResponse {
  profile: Session;
}

export const loader = async () => {
  try {
    const session = getSession();
    // TODO: Get new profile data
    console.log(session);

    return json({
      profile: {
        firstName: 'Hello',
        lastName: 'World',
      },
    });
  } catch (error) {
    console.log(error);
    return redirect('/logout?expired=true');
  }
};

export const Page = () => {
  const loaderData = useLoaderData<typeof loader>() as LoaderResponse;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaderData.profile) {
      navigate('/logout?expired=true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData.profile]);

  return <DashboardLayout />;
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
