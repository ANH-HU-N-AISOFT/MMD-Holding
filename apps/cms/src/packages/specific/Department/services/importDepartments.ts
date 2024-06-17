import { AxiosResponse } from 'axios';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Array<{
    name?: string;
    code?: string;
    managementUnitCode?: string;
    businessStatus?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    unitManagerCode?: string;
    foundationDate?: string;
  }>;
  errors?: Array<{
    itemIndex: number;
    messages: string[];
  }>;
}

export interface ImportDepartments {
  data: ResponseSuccess['items'];
}

export const importDepartments = async ({ data }: ImportDepartments) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'POST',
    url: '/organizations/import/save',
    data: {
      items: data,
    },
  });
  return response.data;
};
