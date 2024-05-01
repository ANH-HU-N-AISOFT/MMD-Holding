export enum EmployeeStatus {
  WORKING = 'working',
  UNPAID_LEAVE = 'unpaid-leave',
  MATERNITY_LEAVE = 'maternity-leave',
  TERMINATED = 'terminated',
}

export enum JobTitleEnum {
  CONSULTANT = 'consultant',
  SALES_PERSONNEL = 'sale',
  LECTURER = 'lecturer',
}
export enum EmploymentContractType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
}

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'fe-male',
}
export enum EmployeeAccessStatus {
  GRANTED = 'granted', // Employee has access
  BLOCKED = 'blocked', // Employee's access is blocked
}

export enum Role {
  Admin = 'admin',
  Sale = 'sale',
  Lecturer = 'lecturer',
  Student = 'student',
  Consultant = 'consultant',
}

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
  organization?: {
    id: string;
    fullName: string;
    code: string;
    phoneNumber: string;
    email: string;
  };
  user?: {
    userName: string;
    roles: Role[];
    accessStatus: EmployeeAccessStatus;
  };
  employee?: {
    id: string;
    code: string;
    organizationId: string;
    jobTitle: JobTitleEnum;
    workStatus: EmployeeStatus;
    contractType: EmploymentContractType;
    contractStartDate: string;
    contractEndDate: string;
  };
}
