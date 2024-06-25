import { AxiosResponse } from 'axios';
import { EmployeeContractType } from '../models/EmployeeContractType';
import { EmployeeStatus } from '../models/EmployeeStatus';
import { JobTitleEnum } from '../models/JobTitleEnum';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Array<{
    fullName?: string;
    phoneNumber?: string;
    birthday?: string;
    gender?: string;
    workEmail?: string;
    personalEmail?: string;
    currentAddress?: string;
    permanentAddress?: string;
    cmnd?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactRelationship?: string;
    notes?: string;
    organizationCode?: string;
    jobTitles?: JobTitleEnum[];
    directManagerCode?: string;
    workStatus?: EmployeeStatus;
    contractType?: EmployeeContractType;
    contractStartDate?: string;
    contractEndDate?: string;
    roles?: string[];
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

export const validateImportEmployees = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'POST',
    url: '/employees/import/validate',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
