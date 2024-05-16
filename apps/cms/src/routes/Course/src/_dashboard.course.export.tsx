import i18next from 'i18next';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { exportCourses } from '~/packages/specific/Course/services/exportCourses';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Course/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  const t = i18next.t;
  const { search, status } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportCourses({
      query: search,
      status: status === 'all' ? undefined : status,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('course:courses') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
