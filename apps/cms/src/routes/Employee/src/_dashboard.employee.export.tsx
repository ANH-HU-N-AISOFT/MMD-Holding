import i18next from 'i18next';
import { isCanExportEmployee } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { exportEmployees } from '~/packages/specific/Employee/services/exportEmployees';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Employee/utils/lisitngUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportEmployee);
  const t = i18next.t;
  const { search, department, roles, status } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportEmployees({
      query: search,
      organizationId: department,
      roles,
      workStatus: status,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('employee:employees') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
