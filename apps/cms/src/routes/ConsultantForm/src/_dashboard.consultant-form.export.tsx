import i18next from 'i18next';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { exportConsultantForms } from '~/packages/specific/ConsultantForm/services/exportConsultantForms';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/ConsultantForm/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  const t = i18next.t;
  const { search } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportConsultantForms({
      query: search,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('consultant_form:consultant_forms') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
