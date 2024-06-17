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
  errors: Array<{
    itemIndex: number;
    messages: string[];
  }>;
  hasError: boolean;
}

export const validateImportDepartments = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'POST',
    url: '/organizations/import/validate',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
