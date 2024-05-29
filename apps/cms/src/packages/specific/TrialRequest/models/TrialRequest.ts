import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { DemoType } from '~/packages/common/SelectVariants/DemoType/constants/DemoType';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { StudyMode } from '~/packages/common/SelectVariants/StudyMode/constants/StudyMode';
import { TrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatus';

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
