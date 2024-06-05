import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { deleteTrialRequest } from '~/packages/specific/TrialRequest/services/deleteTrialRequest';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant] });
  try {
    if (!params['id']) {
      return redirect('/trial-request', {});
    }
    await deleteTrialRequest({ id: params['id'] });
    return json({
      hasError: false,
      message: 'Deleted',
      info: undefined,
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
