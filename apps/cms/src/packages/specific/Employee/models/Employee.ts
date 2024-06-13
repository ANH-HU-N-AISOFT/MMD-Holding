import { EmployeeStatus } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatus';
import { EmploymentContractType } from '~/packages/common/SelectVariants/EmploymentContractType/constants/EmploymentContractType';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { JobTitleEnum } from '~/packages/common/SelectVariants/JobTitle/constants/JobTitleEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';

export interface Employee {
  id: string;
  fullName: string;
  employeeId: string;
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
  createdAt: string;
  directManagerId: string;
  directManager?: {
    id: string;
    fullName: string;
  };
  organizationId?: string;
  organization?: {
    id: string;
    fullName: string;
    code: string;
    phoneNumber: string;
    email: string;
  };
  user?: {
    userName: string;
    roles: Exclude<Role, Role.SuperAdmin>[];
    accessStatus: SystemAccessStatus;
  };
  employee?: {
    id: string;
    code: string;
    organizationId: string;
    jobTitles: JobTitleEnum[];
    workStatus: EmployeeStatus;
    contractType: EmploymentContractType;
    contractStartDate: string;
    contractEndDate: string;
  };
}
