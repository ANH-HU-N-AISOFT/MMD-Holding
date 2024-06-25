import { SourceEnum } from '../../Student/models/SourceEnum';
import { StudyMode } from '../models/StudyMode';
import { DemoType } from './DemoType';
import { TrialRequestStatus } from './TrialRequestStatus';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';

export interface TrialRequest {
  id: string;
  student?: {
    id: string;
    fullName: string;
    school?: {
      id: string;
      name: string;
      code: string;
    };
    phoneNumber?: string;
    source: SourceEnum;
  };
  saleEmployees?: {
    employeeId: string;
    fullName: string;
    phoneNumber: string;
    code: string;
    organization?: {
      id: string;
      fullName: string;
      code: string;
    };
  }[];
  consultant?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    code: string;
    workEmail?: string;
  };
  status: TrialRequestStatus;
  demoType: DemoType;
  courseRoadmap?: {
    id: string;
    name: string;
    code: string;
    courseId: string;
    numberSessions: number;
    sessionDuration: number;
    price: number;
    status: CourseStatus;
    notes: string;
  };
  learningOrganization?: {
    id: string;
    name: string;
    code: string;
    level: number;
  };
  studyDate: string;
  studyTime: string;
  studyMode: StudyMode;
  lecturer?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    code: string;
    workEmail?: string;
  };
  admin?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    code: string;
    workEmail?: string;
  };
  notes: string;
}
