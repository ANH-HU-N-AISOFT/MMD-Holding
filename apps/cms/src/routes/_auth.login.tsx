import { zodResolver } from '@hookform/resolvers/zod';
import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { ActionFunctionArgs, json, redirect, useActionData, useNavigation } from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { getFormLoginZodSchema } from '~/packages/common/Auth/FormLogin/constants/zod';
import { FormLogin } from '~/packages/common/Auth/FormLogin/FormLogin';
import { FormLoginValues } from '~/packages/common/Auth/FormLogin/types/Values';
import { ResponseSuccess, endpoint } from '~/packages/common/Auth/services/login';
import { setSession } from '~/packages/common/Auth/sessionStorage';
import { fetchApi } from '~/utils/functions/fetchApi';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const t = i18next.t;
    const { errors, data } = await getValidatedFormData<FormLoginValues>(
      request,
      zodResolver(getFormLoginZodSchema(t as TFunction<any>)),
    );
    if (data) {
      const response = await fetchApi.request<ResponseSuccess>({
        url: endpoint,
        method: 'POST',
        data: {
          userName: data?.username,
          password: data?.password,
        },
      });
      setSession({
        role: '',
        token: {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        },
      });
      return redirect('/dashboard', {});
    }
    return json(...handleFormResolverError<FormLoginValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['auth']);

  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();
  const isLoggingIn = navigation.state === 'loading' || navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.hasError) {
      notification.error({
        message: t('auth:login_failure'),
        description: t('auth:login_failure_description'),
      });
    }
  }, [actionData, t]);

  return (
    <div>
      <div className="text-center mb-6">
        <img alt="Logo" className="inline-block" src="assets/images/logo.png" />
      </div>
      <div className="max-w-[500px] mx-auto">
        <FormLogin isSubmitting={isLoggingIn} />
      </div>
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
