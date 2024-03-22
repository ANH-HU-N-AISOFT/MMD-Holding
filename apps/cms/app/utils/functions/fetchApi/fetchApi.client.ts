import { AxiosResponse } from 'axios';
import { FetchAPI } from 'utilities';
import { ResponseSuccess } from '~/services/Authentication/refreshToken';
import { getPublicEnv } from '~/utils/enviroment/getPublicEnv';

export const fetchApiClient = new FetchAPI({
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
      fetchApiClient.setAccessToken = () => {
        return response_.data?.accessToken ?? '';
      };
    },
    failure: error => {
      console.log('Token refreshed failure!', error);
      return window.location.replace('/login');
    },
    setRefreshCondition: error => {
      return error.response?.status === 401;
    },
  },
  setAccessToken: () => {
    return '';
  },
  setConditionApplyAccessToken: () => {
    return true;
  },
  setRefreshToken: () => {
    return '';
  },
});
