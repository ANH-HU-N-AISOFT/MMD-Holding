import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { deleteDepartment } from '~/packages/specific/DepartmentList/services/deleteDepartment';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  try {
    if (!params['id']) {
      return redirect('/department-list', {});
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
