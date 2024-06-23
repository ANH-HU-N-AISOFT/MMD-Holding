import { getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/lisitngUrlSearchParamsUtils';

export const getDefaultListingAppointmentsUrl = () => {
  const pathname = '/appointment';
  const isAdmin = getSession()?.profile?.roles.includes(Role.Admin);
  if (isAdmin) {
    return pathname;
  }

  const searchParams = lisitngUrlSearchParamsUtils.encrypt({
    isOwner: true,
  });

  return pathname + searchParams;
};
