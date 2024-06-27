import { BusinessStatusEnum } from './BusinessStatusEnum';
import { DepartmentPopulated } from './DepartmentPopulated';

export enum CapHanhChinh {
  CAP_1 = 1,
  CAP_2 = 2,
  CAP_3 = 3,
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
  managementUnit?: DepartmentPopulated;
  unitManager?: UnitManager;
  id: string;
}
