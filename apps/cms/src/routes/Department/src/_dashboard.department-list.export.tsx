import i18next from 'i18next';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { BusinessStatusEnum } from '~/packages/specific/DepartmentList/models/Department';
import { exportDepartments } from '~/packages/specific/DepartmentList/services/exportDepartments';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/DepartmentList/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  const t = i18next.t;
  const { search, businessStatus } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportDepartments({
      businessStatus: businessStatus as BusinessStatusEnum | undefined,
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
