import i18next from 'i18next';
import { isCanEditEmployee } from './utils/Is';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { validateFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { FormValues } from '~/packages/specific/Employee/components/ResetPassword/ResetPassword';
import { getFormResetPasswordResolver } from '~/packages/specific/Employee/components/ResetPassword/zodResolver';
import { resetPassword } from '~/packages/specific/Employee/services/resetPassword';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params, request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  // FIXME: Có cần thêm permission mới ?
  await isCanAccessRoute(isCanEditEmployee);

  try {
    if (!params['id']) {
      return redirect('/employee', {});
    }
    const t = i18next.t;
    const { errors, data } = await validateFormData<FormValues>(
      await fetcherFormData.decrypt<FormValues>(request),
      getFormResetPasswordResolver(t as any),
    );
    if (data) {
      await resetPassword({
        employeeId: params['id'],
        newPassword: data.newPassword,
      });
      return json({
        hasError: false,
        message: 'Reseted',
        info: undefined,
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
