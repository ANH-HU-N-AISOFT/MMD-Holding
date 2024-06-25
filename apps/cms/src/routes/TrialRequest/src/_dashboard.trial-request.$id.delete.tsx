import { getDefaultListingTrialRequestsUrl } from '../constants/getDefaultFilterUrl';
import { isCanDeleteTrialRequest } from './utils/Is';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { deleteTrialRequest } from '~/packages/specific/TrialRequest/services/deleteTrialRequest';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanDeleteTrialRequest);
  try {
    if (!params['id']) {
      return redirect(getDefaultListingTrialRequestsUrl(), {});
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
