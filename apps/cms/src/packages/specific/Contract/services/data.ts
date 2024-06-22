import { localStorage } from 'utilities';
import { Contract } from '../models/Contract';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';

const KEY = 'contracts';

export let contracts: Contract[] = [
  {
    code: 'AHN1/HV000009',
    organizationName: 'Arena Hà Nam',
    studentId: 'Lê Nhật D',
    studentName: 'Lê Nhật D',
    studentPhone: '0901234708',
    studentGender: GenderEnum.MALE,
    studentDateOfBirth: '2002-01-31',
    studentCitizenIdCard: undefined,
    studentCitizenIdCardCreatedAt: undefined,
    studentCitizenIdCardCreatedWhere: undefined,
    studentCurrentAddress: 'Số 1, Trần Phú, Ba Đình, Hà Nội',
    parentName: undefined,
    parentPhone: '0901234575',
    parentGender: undefined,
    parentDateOfBirth: undefined,
    parentCitizenIdCard: undefined,
    parentCitizenIdCardCreatedAt: undefined,
    parentCitizenIdCardCreatedWhere: undefined,
    parentCurrentAddress: undefined,
    createdAt: '2024-02-14',
    id: '1',
  },
  {
    code: 'AHN1/HV000010',
    organizationName: 'Arena Hà Nam',
    studentId: 'Lê Nhật E',
    studentName: 'Lê Nhật E',
    studentPhone: '0901234709',
    studentGender: GenderEnum.MALE,
    studentDateOfBirth: '2002-01-31',
    studentCitizenIdCard: undefined,
    studentCitizenIdCardCreatedAt: undefined,
    studentCitizenIdCardCreatedWhere: undefined,
    studentCurrentAddress: 'Số 1, Trần Phú, Ba Đình, Hà Nội',
    parentName: undefined,
    parentPhone: '0901234576',
    parentGender: undefined,
    parentDateOfBirth: undefined,
    parentCitizenIdCard: undefined,
    parentCitizenIdCardCreatedAt: undefined,
    parentCitizenIdCardCreatedWhere: undefined,
    parentCurrentAddress: undefined,
    createdAt: '2024-02-12',
    id: '2',
  },
];

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
