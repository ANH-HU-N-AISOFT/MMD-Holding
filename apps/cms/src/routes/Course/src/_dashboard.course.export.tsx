import i18next from 'i18next';
import { isCanExportCourse } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { exportCourses } from '~/packages/specific/Course/services/exportCourses';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Course/utils/lisitngUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { downloadAxiosResponseAsXlsx } from '~/utils/functions/downloadAxiosResponseAsXlsx';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportCourse);
  const t = i18next.t;
  const { search, status } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportCourses({
      query: search,
      status: status === 'all' ? undefined : status,
    });

    downloadAxiosResponseAsXlsx({ response, fileName: t('course:courses') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
