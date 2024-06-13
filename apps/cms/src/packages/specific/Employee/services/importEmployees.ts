import { AxiosResponse } from 'axios';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Array<{
    fullName: string;
    phoneNumber: string;
    birthday: string;
    gender: string;
    workEmail: string;
    personalEmail: string;
    currentAddress: string;
    permanentAddress: string;
    cmnd: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelationship: string;
    notes: string;
    organizationCode: string;
    directManagerCode: string;
    workStatus: string;
    contractType: string;
    contractStartDate: string;
    contractEndDate: string;
    username: string;
    accessStatus: string;
    password: string;
  }>;
  errors?: Array<{
    itemIndex: number;
    messages: string[];
  }>;
}

export interface ImportEmployees {
  data: ResponseSuccess['items'];
}

export const importEmployees = async ({ data }: ImportEmployees) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'POST',
    url: '/employees/import/save',
    data: {
      items: data,
    },
  });
  return response.data;
};
