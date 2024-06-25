import { Employee } from '../models/Employee';
import { EmployeeContractType } from '../models/EmployeeContractType';
import { EmployeeStatus } from '../models/EmployeeStatus';
import { JobTitleEnum } from '../models/JobTitleEnum';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateEmployee {
  fullName: string;
  phoneNumber: string;
  birthday: string;
  gender: GenderEnum;
  currentAddress?: string;
  permanentAddress?: string;
  nationality?: string;
  cmnd?: string;
  personalEmail: string;
  workEmail: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  notes?: string;
  organizationId: string;
  jobTitles: JobTitleEnum[];
  directManagerId?: string;
  workStatus: EmployeeStatus;
  contractType?: EmployeeContractType;
  contractStartDate?: string;
  contractEndDate?: string;
  roles: Role[];
  username: string;
  password: string;
  accessStatus: SystemAccessStatus;
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
