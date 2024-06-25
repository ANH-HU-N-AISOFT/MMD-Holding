import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { DashboardLayout } from '~/layouts/DashboardLayout/DashboardLayout';
import { json, redirect } from '~/overrides/remix';
import { GetPermissionsResponseSuccess, getPermissionsEndpoint } from '~/packages/common/Auth/services/getPermissions';
import { GetProfileResponseSuccess, getProfileEndpoint } from '~/packages/common/Auth/services/getProfile';
import { destroySession, getSession, setSession } from '~/packages/common/Auth/sessionStorage';
import { fetchApi } from '~/utils/functions/fetchApi';

export const loader = async () => {
  try {
    const session = getSession();
    if (!session) {
      destroySession();
      return null;
    }

    const [profileResponse, permissionsResponse] = await Promise.all([
      fetchApi.request<GetProfileResponseSuccess>({ url: getProfileEndpoint }),
      fetchApi.request<GetPermissionsResponseSuccess>({ url: getPermissionsEndpoint }),
    ]);

    if (!permissionsResponse.data.items) {
      return redirect('/logout?expired=true', {});
    }

    setSession({
      ...session,
      permissions: (permissionsResponse.data.items ?? [])?.map(item => ({
        actionType: item.actionType,
        resourceType: item.resourceType,
      })),
      profile: {
        id: profileResponse.data.employeeId,
        roles: profileResponse.data.user?.roles ?? [],
        avatar: '',
        fullName: profileResponse.data.fullName,
        organizationName: profileResponse.data.organization?.fullName ?? '',
        organizationId: profileResponse.data.organization?.id,
        organizationCode: profileResponse.data.organization?.code,
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
