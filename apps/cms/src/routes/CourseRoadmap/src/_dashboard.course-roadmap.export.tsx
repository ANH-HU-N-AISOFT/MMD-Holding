import i18next from 'i18next';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { exportCourseRoadmaps } from '~/packages/specific/CourseRoadmap/services/exportCourseRoadmaps';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/CourseRoadmap/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  const t = i18next.t;
  const { search, status } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportCourseRoadmaps({
      query: search,
      status: status === 'all' ? undefined : status,
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
