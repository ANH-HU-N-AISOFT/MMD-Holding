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
