import { AxiosResponse } from 'axios';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Array<{
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    birthday?: string | undefined;
    gender?: string;
    phoneNumberOfParent?: string;
    notifyResultsToParent?: boolean;
    source?: string;
    organizationCodes?: string[];
    supporterCodes?: string[];
    username?: string;
    accessStatus?: string;
    password?: string;
  }>;
  errors?: Array<{
    itemIndex: number;
    messages: string[];
  }>;
}

export interface ImportStudents {
  data: ResponseSuccess['items'];
}

export const importStudents = async ({ data }: ImportStudents) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'POST',
    url: '/students/import/save',
    data: {
      items: data,
    },
  });
  return response.data;
};
