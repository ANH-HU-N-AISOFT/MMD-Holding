import { delay } from 'utilities';

const fakeData = [
  {
    _id: 'customer_1',
    avatar: 'https://example.com/avatar1.png',
    tenTaiKhoan: 'account_1',
    hoVaTen: 'Customer 1',
    donVi: 'Unit 1',
    email: 'customer1@example.com',
    sdt: '1234567891',
    trangThai: 'Active',
  },
  {
    _id: 'customer_2',
    avatar: 'https://example.com/avatar2.png',
    tenTaiKhoan: 'account_2',
    hoVaTen: 'Customer 2',
    donVi: 'Unit 2',
    email: 'customer2@example.com',
    sdt: '1234567892',
    trangThai: 'Inactive',
  },
  {
    _id: 'customer_3',
    avatar: 'https://example.com/avatar3.png',
    tenTaiKhoan: 'account_3',
    hoVaTen: 'Customer 3',
    donVi: 'Unit 3',
    email: 'customer3@example.com',
    sdt: '1234567893',
    trangThai: 'Active',
  },
];

export const getCustomers = async ({ page, ..._ }: { page: number; pageSize: number }) => {
  await delay(1000);
  if (page === 3) {
    return Promise.resolve({
      getCustomers: {
        hits: [],
        pagination: {
          totalPages: 1,
          totalRecords: 0,
        },
      },
    });
  }
  return Promise.resolve({
    getCustomers: {
      hits: fakeData,
      pagination: {
        totalPages: 1,
        totalRecords: 3,
      },
    },
  });
};
