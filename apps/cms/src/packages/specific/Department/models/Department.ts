import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';

export enum CapHanhChinh {
  CAP_1 = 1,
  CAP_2 = 2,
  CAP_3 = 3,
}

export interface ManagementUnit {
  id: string;
  fullName: string;
  code: string;
  phoneNumber: string;
  email: string;
}
export interface UnitManager {
  id: string;
  employeeId: string;
  fullName: string;
  phoneNumber: string;
  workEmail: string;
  code: string;
}
export interface Department {
  address: string;
  email: string;
  foundationDate: string;
  phoneNumber: string;
  province: string;
  name: string;
  code: string;
  businessStatus: BusinessStatusEnum;
  level: CapHanhChinh;
  managementUnit?: ManagementUnit;
  unitManager?: UnitManager;
  id: string;
}
