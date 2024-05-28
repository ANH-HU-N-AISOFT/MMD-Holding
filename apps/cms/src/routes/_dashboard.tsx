import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { DashboardLayout } from '~/layouts/DashboardLayout/DashboardLayout';
import { json, redirect } from '~/overrides/@remix';
import { ResponseSuccess, endpoint } from '~/packages/common/Auth/services/getProfile';
import { destroySession, getSession, setSession } from '~/packages/common/Auth/sessionStorage';
import { fetchApi } from '~/utils/functions/fetchApi';

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

    setSession({
      ...session,
      profile: {
        id: profileResponse.data.employeeId,
        roles: profileResponse.data.user?.roles ?? [],
        avatar: '',
        fullName: profileResponse.data.fullName,
        organizationName: profileResponse.data.organization?.fullName ?? '',
        organizationId: profileResponse.data.organization?.id,
      },
    });

    return json({});
  } catch (error) {
    console.log(error);
    return redirect('/logout?expired=true', {});
  }
};

export const Page = () => {
  return <DashboardLayout />;
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
