import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { Role } from '~/packages/specific/Employee/models/Employee';
import { deleteEmployee } from '~/packages/specific/Employee/services/deleteEmployee';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin] });
  try {
    if (!params['id']) {
      return redirect('/employee', {});
    }
    await deleteEmployee({ id: params['id'] });
    return json({
      hasError: false,
      message: 'Deleted',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
