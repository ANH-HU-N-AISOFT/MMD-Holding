import { ContractType } from '../models/ContractType';
import { Employee } from '../models/Employee';
import { JobTitleEnum } from '../models/JobTitleEnum';
import { WorkStatus } from '../models/WorkStatus';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateEmployee {
  fullName: string;
  phoneNumber: string;
  birthday: string;
  gender: GenderEnum;
  currentAddress: string | null;
  permanentAddress: string | null;
  nationality: string | null;
  cmnd: string | null;
  personalEmail: string;
  workEmail: string;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelationship: string | null;
  notes: string | null;
  organizationId: string;
  jobTitles: JobTitleEnum[];
  directManagerId: string | null;
  workStatus: WorkStatus;
  contractType: ContractType | null;
  contractStartDate: string | null;
  contractEndDate: string | null;
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
