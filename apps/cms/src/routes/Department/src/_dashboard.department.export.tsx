import i18next from 'i18next';
import { ActionFunctionArgs, json } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { exportDepartments } from '~/packages/specific/Department/services/exportDepartments';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Department/utils/lisitngUrlSearchParamsUtils';
import { downloadAxiosResponseAsCSV } from '~/utils/functions/downloadAxiosResponseAsCSV';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs) => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin] });
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
