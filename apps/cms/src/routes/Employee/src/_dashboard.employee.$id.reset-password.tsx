import i18next from 'i18next';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { validateFormData } from '~/overrides/@remix-hook-form';
import { FormValues } from '~/packages/specific/Employee/components/ResetPassword/ResetPassword';
import { getFormResetPasswordResolver } from '~/packages/specific/Employee/components/ResetPassword/zodResolver';
import { Role } from '~/packages/specific/Employee/models/Employee';
import { resetPassword } from '~/packages/specific/Employee/services/resetPassword';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ params, request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin] });

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
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};
