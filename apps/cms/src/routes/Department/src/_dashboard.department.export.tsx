import i18next from 'i18next';
import { isCanExportDepartment } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { exportDepartments } from '~/packages/specific/Department/services/exportDepartments';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Department/utils/lisitngUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportDepartment);
  const t = i18next.t;
  const { search, businessStatus } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportDepartments({
      businessStatus: businessStatus,
      query: search,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('department:departments') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
