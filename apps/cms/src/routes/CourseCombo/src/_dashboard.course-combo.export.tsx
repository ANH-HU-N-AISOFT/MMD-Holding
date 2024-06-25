import i18next from 'i18next';
import { isCanExportCourseCombo } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { exportCourseCombos } from '~/packages/specific/CourseCombo/services/exportCourseCombos';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/CourseCombo/utils/lisitngUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportCourseCombo);
  const t = i18next.t;
  const { search, status } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportCourseCombos({
      query: search,
      status,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('course_combo:course_combos') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
