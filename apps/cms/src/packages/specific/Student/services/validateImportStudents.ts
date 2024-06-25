import { AxiosResponse } from 'axios';
import { SourceEnum } from '../models/SourceEnum';
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
    source?: SourceEnum;
    organizationCodes?: string[];
    supporterCodes?: string[];
    username?: string;
    accessStatus?: string;
    password?: string;
  }>;
  errors: Array<{
    itemIndex: number;
    messages: string[];
  }>;
  hasError: boolean;
}

export const validateImportStudents = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'POST',
    url: '/students/import/validate',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
