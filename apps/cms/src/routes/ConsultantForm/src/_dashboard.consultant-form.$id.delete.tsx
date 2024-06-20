import { isCanDeleteConsultantForm } from './utils/Is';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { deleteConsultantForm } from '~/packages/specific/ConsultantForm/services/deleteConsultantForm';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanDeleteConsultantForm);
  try {
    if (!params['id']) {
      return redirect('/consultant-form', {});
    }
    await deleteConsultantForm({ id: params['id'] });
    return json({
      hasError: false,
      message: 'Deleted',
      info: undefined,
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
