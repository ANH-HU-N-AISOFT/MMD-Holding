import { City } from '../../Location/models/Location';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';

export interface Student {
  fullName: string;
  phoneNumber: string;
  userId: string;
  email?: string;
  address?: string;
  province?: City;
  district?: City;
  birthday?: Date;
  school?: string;
  gender?: GenderEnum;
  parentPhoneNumber?: string;
  notifyParentsOfResults?: boolean;
  source?: SourceEnum;
  organizationIds: string[];
  supporterIds?: string[];
  code: string;
}
