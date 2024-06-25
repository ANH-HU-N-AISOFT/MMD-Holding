import { isCanDeleteCourseCombo } from './utils/Is';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { deleteCourseCombo } from '~/packages/specific/CourseCombo/services/deleteCourseCombo';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanDeleteCourseCombo);
  try {
    if (!params['id']) {
      return redirect('/course-combo', {});
    }
    await deleteCourseCombo({ id: params['id'] });
    return json({
      hasError: false,
      message: 'Deleted',
      info: undefined,
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
