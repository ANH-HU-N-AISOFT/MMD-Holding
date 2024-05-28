import { ClassType } from '~/packages/common/SelectVariants/ClassType/constants/ClassType';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { LearningType } from '~/packages/common/SelectVariants/LearningType/constants/LearningType';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { TrialStatus } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatus';

export interface Trial {
  id: string;
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
  consultant?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    personalEmail: string;
    workEmail: string;
  };
  saleEmployees?: Array<{
    employeeId: string;
    fullName: string;
    phoneNumber: string;
    code: string;
    organization?: {
      id: string;
      fullName: string;
      code: string;
      phoneNumber: string;
      email: string;
    };
  }>;
  status: TrialStatus;
  classType: ClassType;
  courseRoadmap?: {
    name: string;
    code: string;
    courseId: string;
    numberSessions: number;
    sessionDuration: number;
    price: number;
    status: CourseStatus;
    notes: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  learningOrganization?: {
    id: string;
    name: string;
    code: string;
  };
  learningDate: string;
  learningTime: string;
  learningType: LearningType;
  admin?: {
    id: string;
    phoneNumber: string;
    fullName: string;
    personalEmail: string;
    workEmail: string;
  };
  lecture?: {
    id: string;
    phoneNumber: string;
    fullName: string;
    personalEmail: string;
    workEmail: string;
  };
  notes: string;
}
