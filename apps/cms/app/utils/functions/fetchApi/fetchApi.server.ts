import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { AxiosResponse } from 'axios';
import { FetchAPI } from 'utilities';
import { authSessionStorage } from '~/packages/common/Auth/auth.server';
import { ResponseSuccess } from '~/services/Authentication/refreshToken';
import { getPublicEnv } from '~/utils/enviroment/getPublicEnv';

export const fetchApiServer = async ({ request }: LoaderFunctionArgs | ActionFunctionArgs) => {
  const session = await authSessionStorage.getSession(request);
  const fetchApi = new FetchAPI({
    baseConfig: {
      baseURL: getPublicEnv('PUBLIC_RESTFUL_API'),
    },
    refreshTokenConfig: {
      url: '/authentication/refreshSession',
      bodyData: ({ refreshToken }) => {
        return { token: refreshToken };
      },
      success: response => {
        const response_ = response as AxiosResponse<ResponseSuccess | undefined>;
        console.log('Token refreshed successfully!', response_.data);
        fetchApi.setAccessToken = () => response_.data?.accessToken ?? '';
      },
      failure: () => {
        console.log('Token refreshed failure!');
        throw redirect('/login');
      },
      setRefreshCondition: error => {
        return error.response?.status === 401;
      },
    },
    setConditionApplyAccessToken: () => {
      return true;
    },
    setAccessToken: () => {
      return session.data.sessionData?.token.accessToken ?? '';
    },
    setRefreshToken: () => {
      return session.data.sessionData?.token.refreshToken ?? '';
    },
  });

  return {
    request: fetchApi.request,
  };
};
