import { Department } from './Department';

export type DepartmentPopulated = Pick<Department, 'id' | 'code' | 'name'>;
