import i18next from 'i18next';
import { isCanExportTrialRequest } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { exportTrialRequests } from '~/packages/specific/TrialRequest/services/exportTrialRequests';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportTrialRequest);
  const t = i18next.t;
  const {
    search,
    classType,
    courseRoadmapId,
    departmentId,
    isAdminOwner,
    isConsultantOwner,
    isLecturerOwner,
    learningType,
    status,
  } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportTrialRequests({
      query: search,
      courseRoadmapId,
      demoType: classType,
      isAdminOwner,
      isConsultantOwner,
      isLecturerOwner,
      learningOrganizationId: departmentId,
      status,
      studyMode: learningType,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('trial_request:trials') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
