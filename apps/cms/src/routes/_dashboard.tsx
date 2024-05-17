import { useEffect } from 'react';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { DashboardLayout } from '~/layouts/DashboardLayout/DashboardLayout';
import { json, redirect, useLoaderData, useNavigate } from '~/overrides/@remix';
import { Session } from '~/packages/common/Auth/models/Session';
import { ResponseSuccess, endpoint } from '~/packages/common/Auth/services/getProfile';
import { destroySession, getSession, setSession } from '~/packages/common/Auth/sessionStorage';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface LoaderResponse {
  profile: Session;
}

export const loader = async () => {
  try {
    const session = getSession();
    if (!session) {
      destroySession();
      return null;
    }

    const profileResponse = await fetchApi.request<ResponseSuccess>({
      url: endpoint,
    });
    console.log(profileResponse);
    setSession({
      ...session,
      profile: {
        roles: profileResponse.data.user?.roles ?? [],
        avatar: '',
        fullName: profileResponse.data.fullName,
        organizationName: profileResponse.data.organization?.fullName ?? '',
        organizationId: profileResponse.data.organization?.id,
      },
    });

    return json({
      profile: {
        firstName: 'Hello',
        lastName: 'World',
      },
    });
  } catch (error) {
    console.log(error);
    return redirect('/logout?expired=true', {});
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
