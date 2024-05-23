import i18next from 'i18next';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { EmployeeStatus } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { exportEmployees } from '~/packages/specific/Employee/services/exportEmployees';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Employee/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  isCanAccessRoute({ accept: [Role.Admin] });
  const t = i18next.t;
  const { search, department, roles, status } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportEmployees({
      query: search,
      organizationId: department,
      roles,
      workStatus: status as EmployeeStatus | undefined,
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
