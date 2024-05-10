import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';
import { IeltsTestEnum } from '~/packages/common/SelectVariants/IeltsTestEnum/constants/IeltsTestEnum';
import { TestType } from '~/packages/common/SelectVariants/TestType/constants/TestType';

export interface Appointment {
  id: string;
  status: AppointmentStatus;
  demands: string[];
  testType: TestType;
  appointmentDate: string;
  appointmentTime: string;
  test: IeltsTestEnum;
  createdAt: string;
  student?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    school?: {
      id: string;
      code: string;
      name: string;
    };
    source: string;
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
  notes?: string;
  extraDemand?: string;
}
