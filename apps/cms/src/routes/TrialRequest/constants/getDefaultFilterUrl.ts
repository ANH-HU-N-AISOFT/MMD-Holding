import { getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/lisitngUrlSearchParamsUtils';

export const getDefaultListingTrialRequestsUrl = () => {
  const pathname = '/trial-request';
  const isAdmin = getSession()?.profile?.roles.includes(Role.Admin);
  if (isAdmin) {
    return pathname;
  }

  const isConsultant = getSession()?.profile?.roles.includes(Role.Consultant);
  if (isConsultant) {
    const searchParams = lisitngUrlSearchParamsUtils.encrypt({
      isConsultantOwner: isConsultant,
    });

    return pathname + searchParams;
  }
  const isLecturer = getSession()?.profile?.roles.includes(Role.Lecturer);
  if (isLecturer) {
    const searchParams = lisitngUrlSearchParamsUtils.encrypt({
      isLecturerOwner: isLecturer,
    });

    return pathname + searchParams;
  }
  return pathname;
};
