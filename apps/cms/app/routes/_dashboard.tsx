import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { DashboardLayout } from '~/layouts/DashboardLayout/DashboardLayout';
import { authSessionStorage } from '~/packages/common/Auth/auth.server';
import { Session } from '~/packages/common/Auth/models/Session';

export interface LoaderResponse {
  session: Session;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authSessionStorage.guard({ request, homeUrl: '/dashboard' });
  try {
    // Get new profile data

    // session.set('sessionData', {});

    return json({
      session: session.data.sessionData,
    });
  } catch (error) {
    console.log(error);
    return redirect('/logout?expired=true');
  }
};

const DashboardLayoutRoot = () => {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaderData.session) {
      navigate('/logout?expired=true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData.session]);

  return <DashboardLayout session={loaderData.session} />;
};

export default DashboardLayoutRoot;
