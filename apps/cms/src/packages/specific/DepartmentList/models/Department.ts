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
  _id: string;
  name: string;
  code: string;
  managementUnitId?: string;
  businessStatus: BusinessStatusEnum;
  level: CapHanhChinh;
  address: string;
  province: string;
  foundationDate: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  managementUnit?: ManagementUnit;
  __v: 0;
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
  unitManager?: {
    fullName: string;
    email: string;
    id: string;
  };
  id: string;
}
