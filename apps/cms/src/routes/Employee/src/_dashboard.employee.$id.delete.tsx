import { isCanDeleteEmployee } from './utils/Is';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { deleteEmployee } from '~/packages/specific/Employee/services/deleteEmployee';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanDeleteEmployee);
  try {
    if (!params['id']) {
      return redirect('/employee', {});
    }
    await deleteEmployee({ id: params['id'] });
    return json({
      hasError: false,
      message: 'Deleted',
      info: undefined,
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
