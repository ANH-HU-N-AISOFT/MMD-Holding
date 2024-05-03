import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';

export interface Student {
  id: string;
  fullName: string;
  phoneNumber: string;
  userId: string;
  email?: string;
  address?: string;
  province?: {
    id: string;
    name: string;
    code: string;
  };
  district?: {
    id: string;
    name: string;
    code: string;
  };
  birthday?: string;
  school?: string;
  gender?: GenderEnum;
  notifyParentsOfResults?: true;
  source?: SourceEnum;
  parentPhoneNumber?: string;
  organizationIds?: string[];
  supporterIds?: string[];
  code: string;
  organizations?: Array<{
    id: string;
    name: string;
    code: string;
    level: 2;
  }>;
  supporters?: Array<{
    // FIXME: Liệu còn cần organizationId để nâng UX cho action select department & saleEmployees
    id: string;
    employeeId: string;
    fullName: string;
    workEmail: string;
    phoneNumber: string;
  }>;
  user?: {
    userName: string;
    roles: Role[];
    accessStatus: EmployeeAccessStatus;
  };
}
