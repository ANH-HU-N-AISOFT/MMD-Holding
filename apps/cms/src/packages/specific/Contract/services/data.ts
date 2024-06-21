import { localStorage } from 'utilities';
import { Contract } from '../models/Contract';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';

const KEY = 'contracts';

const defaultRecords: Contract[] = [
  {
    code: 'AHN8/HV00053',
    organizationName: 'Trần Bình',
    studentId: 'Nguyễn Thị Hồng',
    studentName: 'Nguyễn Thị Hồng',
    studentPhone: '0905123456',
    studentGender: GenderEnum.FEMALE,
    studentDateOfBirth: '2003-05-12',
    studentCitizenIdCard: '123456789012',
    studentCitizenIdCardCreatedAt: '2021-05-12',
    studentCitizenIdCardCreatedWhere: 'Hà Nội',
    studentCurrentAddress: '23 Lê Duẩn, Quận Hoàn Kiếm, Hà Nội',
    parentName: 'Nguyễn Văn An',
    parentPhone: '0906123456',
    parentGender: GenderEnum.MALE,
    parentDateOfBirth: '1975-07-20',
    parentCitizenIdCard: '987654321098',
    parentCitizenIdCardCreatedAt: '1995-08-30',
    parentCitizenIdCardCreatedWhere: 'Hà Nội',
    parentCurrentAddress: '23 Lê Duẩn, Quận Hoàn Kiếm, Hà Nội',
    createdAt: '2024-02-14',
    id: '1',
  },
  {
    code: 'AHN8/HV000100',
    organizationName: 'Trần Bình',
    studentId: 'Trần Văn Bình',
    studentName: 'Trần Văn Bình',
    studentPhone: '0905234567',
    studentGender: GenderEnum.MALE,
    studentDateOfBirth: '2002-09-15',
    studentCitizenIdCard: '234567890123',
    studentCitizenIdCardCreatedAt: '2021-09-15',
    studentCitizenIdCardCreatedWhere: 'TP. Hồ Chí Minh',
    studentCurrentAddress: '45 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    parentName: 'Trần Thị Lan',
    parentPhone: '0906234567',
    parentGender: GenderEnum.FEMALE,
    parentDateOfBirth: '1978-03-12',
    parentCitizenIdCard: '876543210987',
    parentCitizenIdCardCreatedAt: '1998-04-15',
    parentCitizenIdCardCreatedWhere: 'TP. Hồ Chí Minh',
    parentCurrentAddress: '45 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    createdAt: '2024-02-02',
    id: '2',
  },
  {
    code: 'AHN8/HV002301',
    organizationName: 'Trần Bình',
    studentId: 'Lê Thị Mai',
    studentName: 'Lê Thị Mai',
    studentPhone: '0905345678',
    studentGender: GenderEnum.FEMALE,
    studentDateOfBirth: '2001-11-30',
    studentCitizenIdCard: '345678901234',
    studentCitizenIdCardCreatedAt: '2021-11-30',
    studentCitizenIdCardCreatedWhere: 'Đà Nẵng',
    studentCurrentAddress: '67 Bạch Đằng, Quận Hải Châu, Đà Nẵng',
    parentName: 'Lê Văn Bình',
    parentPhone: '0906345678',
    parentGender: GenderEnum.MALE,
    parentDateOfBirth: '1970-12-10',
    parentCitizenIdCard: '765432109876',
    parentCitizenIdCardCreatedAt: '1990-01-20',
    parentCitizenIdCardCreatedWhere: 'Đà Nẵng',
    parentCurrentAddress: '67 Bạch Đằng, Quận Hải Châu, Đà Nẵng',
    createdAt: '2024-01-29',
    id: '3',
  },
  {
    code: 'AHN8/HV00067',
    organizationName: 'Trần Bình',
    studentId: '20210004',
    studentName: 'Phạm Quốc Anh',
    studentPhone: '0905456789',
    studentGender: GenderEnum.MALE,
    studentDateOfBirth: '2000-07-20',
    studentCitizenIdCard: '456789012345',
    studentCitizenIdCardCreatedAt: '2019-07-20',
    studentCitizenIdCardCreatedWhere: 'Hải Phòng',
    studentCurrentAddress: '89 Trần Phú, Quận Ngô Quyền, Hải Phòng',
    parentName: 'Phạm Thị Hạnh',
    parentPhone: '0906456789',
    parentGender: GenderEnum.FEMALE,
    parentDateOfBirth: '1969-04-25',
    parentCitizenIdCard: '654321098765',
    parentCitizenIdCardCreatedAt: '1989-05-10',
    parentCitizenIdCardCreatedWhere: 'Hải Phòng',
    parentCurrentAddress: '89 Trần Phú, Quận Ngô Quyền, Hải Phòng',
    createdAt: '2024-01-28',
    id: '4',
  },
  {
    code: 'AHN8/HV00082',
    organizationName: 'Trần Bình',
    studentId: '20210005',
    studentName: 'Vũ Thị Minh',
    studentPhone: '0905567890',
    studentGender: GenderEnum.FEMALE,
    studentDateOfBirth: '2004-12-15',
    studentCitizenIdCard: '567890123456',
    studentCitizenIdCardCreatedAt: '2022-12-15',
    studentCitizenIdCardCreatedWhere: 'Hà Nội',
    studentCurrentAddress: '101 Lý Thường Kiệt, Quận Đống Đa, Hà Nội',
    parentName: 'Vũ Văn Nam',
    parentPhone: '0906567890',
    parentGender: GenderEnum.MALE,
    parentDateOfBirth: '1975-08-05',
    parentCitizenIdCard: '543210987654',
    parentCitizenIdCardCreatedAt: '1995-09-10',
    parentCitizenIdCardCreatedWhere: 'Hà Nội',
    parentCurrentAddress: '101 Lý Thường Kiệt, Quận Đống Đa, Hà Nội',
    createdAt: '2024-01-14',
    id: '5',
  },
  {
    code: 'AHN8/HV000104',
    organizationName: 'Trần Bình',
    studentId: '20210006',
    studentName: 'Đỗ Văn Hùng',
    studentPhone: '0905678901',
    studentGender: GenderEnum.MALE,
    studentDateOfBirth: '2001-01-01',
    studentCitizenIdCard: '678901234567',
    studentCitizenIdCardCreatedAt: '2021-01-01',
    studentCitizenIdCardCreatedWhere: 'Hải Dương',
    studentCurrentAddress: '23 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội',
    parentName: 'Đỗ Thị Lan',
    parentPhone: '0906678901',
    parentGender: GenderEnum.FEMALE,
    parentDateOfBirth: '1980-06-12',
    parentCitizenIdCard: '432109876543',
    parentCitizenIdCardCreatedAt: '2000-07-20',
    parentCitizenIdCardCreatedWhere: 'Hải Dương',
    parentCurrentAddress: '23 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội',
    createdAt: '2024-01-12',
    id: '6',
  },
  {
    code: 'AHN8/HV000220',
    organizationName: 'Trần Bình',
    studentId: '20210007',
    studentName: 'Bùi Thị Hoa',
    studentPhone: '0905789012',
    studentGender: GenderEnum.FEMALE,
    studentDateOfBirth: '2002-02-14',
    studentCitizenIdCard: '789012345678',
    studentCitizenIdCardCreatedAt: '2021-02-14',
    studentCitizenIdCardCreatedWhere: 'Bắc Ninh',
    studentCurrentAddress: '45 Hàng Bài, Quận Hoàn Kiếm, Hà Nội',
    parentName: 'Bùi Văn Long',
    parentPhone: '0906789012',
    parentGender: GenderEnum.MALE,
    parentDateOfBirth: '1972-03-10',
    parentCitizenIdCard: '321098765432',
    parentCitizenIdCardCreatedAt: '1992-04-15',
    parentCitizenIdCardCreatedWhere: 'Bắc Ninh',
    parentCurrentAddress: '45 Hàng Bài, Quận Hoàn Kiếm, Hà Nội',
    createdAt: '2023-11-25',
    id: '7',
  },
];
export let contracts: Contract[] = [];

const initialize = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? '');
    contracts = data;
  } catch {
    contracts = defaultRecords;
    localStorage.setItem(KEY, JSON.stringify(defaultRecords));
  }
};
initialize();

export const remove = (index: number) => {
  contracts = [...contracts.slice(0, index), ...contracts.slice(index + 1)];
  localStorage.setItem(KEY, JSON.stringify(contracts));
};

export const add = (record: Contract) => {
  contracts = [record, ...contracts];
  localStorage.setItem(KEY, JSON.stringify(contracts));
};

export const update = (id: Contract['id'], data: Omit<Contract, 'id' | 'createdAt'>) => {
  const index = contracts.findIndex(template => template.id === id);

  if (index === -1) {
    return null;
  }

  const updatedTemplate: Contract = {
    ...contracts[index],
    ...data,
  };

  contracts[index] = updatedTemplate;

  localStorage.setItem(KEY, JSON.stringify(contracts));

  return contracts[index];
};
