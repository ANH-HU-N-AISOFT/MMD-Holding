import i18next from 'i18next';
import { isCanExportCourseRoadmap } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { exportCourseRoadmaps } from '~/packages/specific/CourseRoadmap/services/exportCourseRoadmaps';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/CourseRoadmap/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportCourseRoadmap);
  const t = i18next.t;
  const { search, status } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportCourseRoadmaps({
      query: search,
      status,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('course_roadmap:course_roadmaps') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
