import i18next from 'i18next';
import { isCanExportAppointment } from './utils/Is';
import { ActionFunctionArgs, json } from '~/overrides/remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { exportAppointments } from '~/packages/specific/Appointment/services/exportAppointments';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/lisitngUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { downloadAxiosResponseAsXlsx } from '~/utils/functions/downloadAxiosResponseAsXlsx';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute(isCanExportAppointment);
  const t = i18next.t;
  const { search, organizationId, status, isOwner } = lisitngUrlSearchParamsUtils.decrypt(request);

  try {
    const response = await exportAppointments({
      query: search,
      status: status === 'all' ? undefined : status,
      organizationIds: organizationId ? [organizationId] : undefined,
      isOwner,
    });

    downloadAxiosResponseAsXlsx({
      response,
      fileName: t('appointment:appointments'),
    });

    return json({
      hasError: false,
      message: 'Exported',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
