export enum CapHanhChinh {
  CAP_1 = 1,
  CAP_2 = 2,
  CAP_3 = 3,
}

export enum BusinessStatusEnum {
  ACTIVE = 'active',
  COMING_SOON = 'coming_soon',
  TEMPORARILY_CLOSED = 'temporarily_closed',
  PERMANENTLY_CLOSED = 'permanently_closed',
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
  fullName: string;
  phoneNumber: string;
  workEmail: string;
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
