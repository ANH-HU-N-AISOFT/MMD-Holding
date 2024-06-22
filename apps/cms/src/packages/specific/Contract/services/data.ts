import { localStorage } from 'utilities';
import { Contract } from '../models/Contract';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';

const KEY = 'contracts';

export let contracts: Contract[] = [
  {
    code: 'AHN8/HV000044',
    organizationName: 'Trần Bình',
    studentId: 'Nguyễn Lê Thu D',
    studentName: 'Nguyễn Lê Thu D',
    studentPhone: '0901234743',
    studentGender: GenderEnum.FEMALE,
    studentDateOfBirth: '2002-01-31',
    studentCitizenIdCard: undefined,
    studentCitizenIdCardCreatedAt: undefined,
    studentCitizenIdCardCreatedWhere: undefined,
    studentCurrentAddress: 'Số 1, Trần Phú, Ba Đình, Hà Nội',
    parentName: undefined,
    parentPhone: '0901234610',
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
    code: 'AHN8/HV000041',
    organizationName: 'Trần Bình',
    studentId: 'Nguyễn Lê Thu A',
    studentName: 'Nguyễn Lê Thu A',
    studentPhone: '0901234740',
    studentGender: GenderEnum.FEMALE,
    studentDateOfBirth: '2002-01-31',
    studentCitizenIdCard: undefined,
    studentCitizenIdCardCreatedAt: undefined,
    studentCitizenIdCardCreatedWhere: undefined,
    studentCurrentAddress: 'Số 1, Trần Phú, Ba Đình, Hà Nội',
    parentName: undefined,
    parentPhone: '0901234607',
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
