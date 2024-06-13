import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';

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
  school?: {
    id: string;
    name: string;
    code: string;
  };
  gender?: GenderEnum;
  notifyParentsOfResults?: true;
  source?: SourceEnum;
  parentPhoneNumber?: string;
  organizationIds?: string[];
  supporterIds?: string[];
  supporterOrganizationIds?: Array<{ id: string }>;
  code: string;
  organizations?: Array<{
    id: string;
    name: string;
    code: string;
    level: 2;
  }>;
  supporters?: Array<{
    id: string;
    employeeId: string;
    fullName: string;
    workEmail: string;
    phoneNumber: string;
  }>;
  user?: {
    userName: string;
    roles: Role[];
    accessStatus: SystemAccessStatus;
  };
}
