import { zodResolver } from '@hookform/resolvers/zod';
import { useActionData, useNavigation } from '@remix-run/react';
import { json } from '@remix-run/server-runtime';
import { notification } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getValidatedFormData } from 'remix-hook-form';
import Image from 'remix-image';
import type { ActionFunctionArgs } from '@remix-run/server-runtime';
import { authSessionStorage } from '~/packages/common/Auth/auth.server';
import { getFormLoginZodSchema } from '~/packages/common/Auth/components/FormLogin/constants/zod';
import { FormLogin } from '~/packages/common/Auth/components/FormLogin/FormLogin';
import { FormLoginValues } from '~/packages/common/Auth/components/FormLogin/types/Values';
import { Session } from '~/packages/common/Auth/models/Session';
import { urlSearchParams } from '~/packages/common/Auth/utils/urlSearchParams';
import { i18next } from '~/packages/common/I18n/i18next.server';
import { ResponseSuccess } from '~/services/Authentication/login';
import { fetchApiServer } from '~/utils/functions/fetchApi/fetchApi.server';

export const action = async ({ request, ...params }: ActionFunctionArgs) => {
  try {
    const t = await i18next.getFixedT(request, ['common']);
    const { data } = await getValidatedFormData<FormLoginValues>(request, zodResolver(getFormLoginZodSchema(t)));
    // Login
    const fetchInstance = await fetchApiServer({ request, ...params });
    const response = await fetchInstance.request<ResponseSuccess>({
      url: '/authentication/createSession',
      method: 'POST',
      data: {
        userName: data?.username,
        password: data?.password,
      },
    });
    console.log(response.data);
    // Get profile

    const latestProfileData: Session = {
      role: '',
      token: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      },
    };

    const query = urlSearchParams.getUrlSearchParams(request);
    return authSessionStorage.createSession({
      request,
      redirectTo: query.get('redirectTo') ?? '/',
      remember: data?.remember ?? false,
      sessionData: {
        sessionData: latestProfileData,
      },
    });
  } catch (error) {
    console.log(error);
    return json({ hasError: true, error }, { status: 400 });
  }
};

const Login = () => {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isLoggingIn = navigation.state === 'loading' || navigation.state === 'submitting';
  const { t } = useTranslation(['auth']);

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
        <Image className="inline-block" src="assets/images/logo.png" />
      </div>
      <div className="max-w-[500px] mx-auto">
        <FormLogin isSubmitting={isLoggingIn} />
      </div>
    </div>
  );
};

export default Login;
