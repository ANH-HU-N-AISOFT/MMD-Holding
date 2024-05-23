import i18next from 'i18next';
import { ActionFunctionArgs, TypedResponse, json, redirect } from '~/overrides/@remix';
import { validateFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormValues } from '~/packages/specific/Student/components/ResetPassword/ResetPassword';
import { getFormResetPasswordResolver } from '~/packages/specific/Student/components/ResetPassword/zodResolver';
import { resetPassword } from '~/packages/specific/Student/services/resetPassword';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ params, request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });

  try {
    if (!params['id']) {
      return redirect('/student', {});
    }
    const t = i18next.t;
    const { errors, data } = await validateFormData<FormValues>(
      await fetcherFormData.decrypt<FormValues>(request),
      getFormResetPasswordResolver(t as any),
    );
    if (data) {
      await resetPassword({
        id: params['id'],
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
