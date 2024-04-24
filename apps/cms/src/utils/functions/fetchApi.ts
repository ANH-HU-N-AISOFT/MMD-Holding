import { AxiosResponse } from 'axios';
import { FetchAPI } from 'utilities';
import { ResponseSuccess, endpoint } from '~/packages/common/Auth/services/refreshToken';
import { destroySession, getSession } from '~/packages/common/Auth/sessionStorage';
import { getPublicEnv } from '~/utils/enviroment/getPublicEnv';

export const fetchApi = new FetchAPI({
  baseConfig: {
    baseURL: getPublicEnv('VITE_RESTFUL_API'),
  },
  refreshTokenConfig: {
    url: endpoint,
    bodyData: ({ refreshToken }) => {
      return { token: refreshToken };
    },
    success: response => {
      const response_ = response as AxiosResponse<ResponseSuccess | undefined>;
      console.log('Token refreshed successfully!', response_.data);
      fetchApi.setAccessToken = () => {
        return response_.data?.accessToken ?? '';
      };
    },
    failure: error => {
      console.log('Token refreshed failure!', error);
      destroySession();
    },
    setRefreshCondition: error => {
      return error.response?.status === 401;
    },
  },
  setAccessToken: () => {
    return getSession()?.token.accessToken ?? '';
  },
  setConditionApplyAccessToken: config => {
    const baseURL = getPublicEnv('VITE_RESTFUL_API');
    return !!config.baseURL?.startsWith(baseURL) || !!config.url?.startsWith(baseURL);
  },
  setRefreshToken: () => {
    return getSession()?.token.refreshToken ?? '';
  },
});
