import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { deleteDepartment } from '~/packages/specific/Department/services/deleteDepartment';
import { Role } from '~/packages/specific/Employee/models/Employee';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin] });
  try {
    if (!params['id']) {
      return redirect('/department', {});
    }
    await deleteDepartment({ id: params['id'] });
    return json({
      hasError: false,
      message: 'Deleted',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
