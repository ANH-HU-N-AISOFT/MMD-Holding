import { Employee } from '~/packages/specific/Employee/models/Employee';

export type GetProfileResponseSuccess = Employee;

export const getProfileEndpoint = '/profile';
