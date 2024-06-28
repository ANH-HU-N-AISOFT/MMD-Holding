import i18next from 'i18next';
import { isCanExportTrialRequest } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { exportTrialRequests } from '~/packages/specific/TrialRequest/services/exportTrialRequests';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsXlsx } from '~/utils/functions/downloadAxiosResponseAsXlsx';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportTrialRequest);
  const t = i18next.t;
  const {
    search,
    demoType,
    courseRoadmapId,
    departmentId,
    isAdminOwner,
    isConsultantOwner,
    isLecturerOwner,
    studyMode,
    status,
  } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportTrialRequests({
      query: search,
      courseRoadmapId,
      demoType,
      isAdminOwner,
      isConsultantOwner,
      isLecturerOwner,
      learningOrganizationId: departmentId,
      status,
      studyMode,
    });

    downloadAxiosResponseAsXlsx({ response, fileName: t('trial_request:trials') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
