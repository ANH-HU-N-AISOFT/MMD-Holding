import {
  Employee,
  EmployeeAccessStatus,
  EmployeeStatus,
  EmploymentContractType,
  GenderEnum,
  JobTitleEnum,
  Role,
} from '../models/Employee';
import { fetchApi } from '~/utils/functions/fetchApi';
import { removeEmptyStringKeys } from '~/utils/functions/removeEmptyStringKeys';

export interface UpdateEmployee {
  id: Employee['employeeId'];
  data: {
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
    accessStatus: EmployeeAccessStatus;
  };
}

export interface ResponseSuccess {}

export const updateEmployee = async ({ data, id }: UpdateEmployee) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/organizations/${id}`,
    data: removeEmptyStringKeys(data),
  });
  return response.data;
};
