import i18next from 'i18next';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { exportEmployees } from '~/packages/specific/Employee/services/exportEmployees';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Employee/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  const t = i18next.t;
  const { search } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportEmployees({
      query: search,
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
