import i18next from 'i18next';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { exportStudents } from '~/packages/specific/Student/services/exportStudents';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Student/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });
  const t = i18next.t;
  const { search, department } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportStudents({
      query: search,
      orgCodes: department,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('student:students') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
