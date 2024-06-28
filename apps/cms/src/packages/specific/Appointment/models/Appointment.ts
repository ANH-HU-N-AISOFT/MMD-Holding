import { SourceEnum } from '../../Student/models/SourceEnum';
import { AppointmentStatus } from './AppointmentStatus';
import { IeltsTestEnum } from './IeltsTestEnum';
import { TestType } from './TestType';

export interface Appointment {
  id: string;
  saleEmployees?: Array<{
    employeeId: string;
    fullName: string;
    phoneNumber: string;
    code: string;
    organization?: {
      id: string;
      fullName: string;
      code: string;
    };
    _id: string;
  }>;
  status: AppointmentStatus;
  demands: string[];
  testType: TestType;
  appointmentDate: string;
  appointmentTime: string;
  test: IeltsTestEnum;
  notes: string;
  createdAt: string;
  createdBy?: {
    id: string;
    phoneNumber: string;
    fullName: string;
    personalEmail: string;
    workEmail: string;
  };
  student?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    school?: {
      id: string;
      code: string;
      name: string;
    };
    source: SourceEnum;
  };
  organization?: {
    id: string;
    name: string;
    code: string;
    phoneNumber: string;
    email: string;
  };
  testingShift?: {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
  };
  consultant?: {
    id: string;
    phoneNumber: string;
    fullName: string;
    personalEmail: string;
    workEmail: string;
  };
  admin?: {
    id: string;
    phoneNumber: string;
    fullName: string;
    personalEmail: string;
    workEmail: string;
  };
  tester?: {
    id: string;
    phoneNumber: string;
    fullName: string;
    personalEmail: string;
    workEmail: string;
  };
  extraDemand?: string;
}
