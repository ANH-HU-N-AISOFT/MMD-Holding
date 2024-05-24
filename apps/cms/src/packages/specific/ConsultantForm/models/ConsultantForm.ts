import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';
import { PromotionScope } from '~/packages/common/SelectVariants/PromotionScope/constants/PromotionScope';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';

export interface ConsultantForm {
  student?: {
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
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
  id: string;
}
