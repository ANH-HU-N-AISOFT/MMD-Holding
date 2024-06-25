import { isCanDeleteDocumentTemplate } from './utils/Is';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { deleteDocumentTemplate } from '~/packages/specific/DocumentTemplate/services/deleteDocumentTemplate';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanDeleteDocumentTemplate);
  try {
    if (!params['id']) {
      return redirect('/document-template', {});
    }
    await deleteDocumentTemplate({ id: params['id'] });
    return json({
      hasError: false,
      message: 'Deleted',
      info: undefined,
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
