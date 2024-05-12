import i18next from 'i18next';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { exportAppointments } from '~/packages/specific/Appointment/services/exportAppointments';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  const t = i18next.t;
  const {
    search,
    organizationId,
    status,
    // date,
    isOwner,
    // test, testShiftId
  } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportAppointments({
      query: search,
      status: status === 'all' ? undefined : status,
      organizationId,
      isOwner,
    });

    downloadAxiosResponseAsCSV({ response, fileName: t('appointment:appointments') });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
