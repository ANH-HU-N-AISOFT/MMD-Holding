import i18next from 'i18next';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { exportStudents } from '~/packages/specific/Student/services/exportStudents';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Student/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  const t = i18next.t;
  const { search } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportStudents({
      query: search,
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
