import { PromotionType } from '../../Promotion/constants/PromotionType';
import { PromotionScope } from '../../Promotion/models/PromotionScope';
import { PromotionStatus } from '../../Promotion/models/PromotionStatus';
import { SourceEnum } from '../../Student/models/SourceEnum';
import { FormStatus } from './FormStatus';
import { CourseStatus } from '~/packages/specific/Course/models/CourseStatus';

export interface ConsultantForm {
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
  courseCombo?: {
    id: string;
    name: string;
    status: CourseStatus;
    totalNumberSessions: number;
    totalPrice: number;
    nameLower: string;
    courseRoadmap?: Array<{
      id: string;
      name: string;
      status: CourseStatus;
      code: string;
      numberSessions: number;
      sessionDuration: number;
      price: number;
      notes: string;
    }>;
  };
  promotions?: Array<{
    name: string;
    code: string;
    status: PromotionStatus;
    startDate: string;
    endDate: string;
    programType: PromotionType;
    scope: PromotionScope;
    organizationIds: string[];
    notes: string;
    feeDiscount: number;
    giftDiscount: string;
    percentageDiscount: number;
    createdAt: string;
    updatedAt: string;
    id: string;
  }>;
  originPrice: number;
  salePrice: 0;
  gifts?: Array<{
    name: string;
    code: string;
    status: PromotionStatus;
    startDate: string;
    endDate: string;
    programType: PromotionType;
    scope: PromotionScope;
    organizationIds: string[];
    notes: string;
    feeDiscount: number;
    giftDiscount: string;
    percentageDiscount: number;
    createdAt: string;
    updatedAt: string;
    id: string;
  }>;
  learningOrganization?: {
    id: string;
    name: string;
    code: string;
  };
  consultant?: {
    id: string;
    fullName: string;
    phoneNumber: string;
  };
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
  id: string;
  notes: string;
  examResults: string[];
  giftInCurrency: number;
}
