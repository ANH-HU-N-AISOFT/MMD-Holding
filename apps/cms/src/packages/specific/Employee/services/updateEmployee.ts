import { ContractType } from '../models/ContractType';
import { Employee } from '../models/Employee';
import { JobTitleEnum } from '../models/JobTitleEnum';
import { WorkStatus } from '../models/WorkStatus';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateEmployee {
  id: Employee['employeeId'];
  data: {
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
    workStatus: WorkStatus;
    contractType?: ContractType;
    contractStartDate?: string;
    contractEndDate?: string;
    roles: Role[];
    username: string;
    accessStatus: SystemAccessStatus;
  };
}

export interface ResponseSuccess {}

export const updateEmployee = async ({ data, id }: UpdateEmployee) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/employees/${id}`,
    data: data,
  });
  return response.data;
};
