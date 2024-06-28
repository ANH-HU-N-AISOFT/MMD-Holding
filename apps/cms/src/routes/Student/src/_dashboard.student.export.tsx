import i18next from 'i18next';
import { isCanExportStudent } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { exportStudents } from '~/packages/specific/Student/services/exportStudents';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Student/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsXlsx } from '~/utils/functions/downloadAxiosResponseAsXlsx';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportStudent);
  const t = i18next.t;
  const { search, departments } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportStudents({
      withoutPermission: false,
      query: search,
      orgCodes: departments,
    });

    downloadAxiosResponseAsXlsx({ response, fileName: t('student:students') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
