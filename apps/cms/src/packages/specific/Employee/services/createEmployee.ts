import { Employee } from '../models/Employee';
import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { EmployeeStatus } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatus';
import { EmploymentContractType } from '~/packages/common/SelectVariants/EmploymentContractType/constants/EmploymentContractType';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { JobTitleEnum } from '~/packages/common/SelectVariants/JobTitle/constants/JobTitleEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateEmployee {
  fullName: string;
  phoneNumber: string;
  birthday: string;
  gender: GenderEnum;
  currentAddress: string;
  permanentAddress: string;
  nationality: string;
  cmnd: string;
  personalEmail: string;
  workEmail: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  notes: string;
  organizationId: string;
  jobTitle: JobTitleEnum;
  directManagerId: string;
  workStatus: EmployeeStatus;
  contractType: EmploymentContractType;
  contractStartDate: string;
  contractEndDate: string;
  roles: Role[];
  username: string;
  password: string;
  accessStatus: EmployeeAccessStatus;
}

export type ResponseSuccess = Employee;

export const createEmployee = async (data: CreateEmployee) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/employees',
    data: data,
  });
  return response.data;
};
