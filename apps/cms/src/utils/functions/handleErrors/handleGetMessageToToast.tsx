import { ReactNode } from 'react';
import { SEPARATOR } from './handleAxiosError';
import type { TFunction } from 'i18next';
import type { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { SerializeFrom } from '~/overrides/@remix';

const StringMappingToStatusCode = {
  // 30/04 => Department
  NOT_VALID_MANAGEMENT_UNIT_OBJECT_ID: '11007020',
  MANAGEMENT_UNIT_NOT_FOUND: '11007021',
  MANAGEMENT_UNIT_CAN_NOT_LEVEL_3: '11007022',
  ORGANIZATION_NAME_EXIST: '11007023',
  ORGANIZATION_CODE_EXIST: '11007024',
  NOT_VALID_MANAGER_OBJECT_ID: '11007025',
  MANAGER_NOT_FOUND: '11007026',
  NOT_VALID_API_KEY_ID: '11001027',
  API_KEY_NOT_FOUND: '11001028',
  ONLY_ONE_ORGANIZATION_LEVEL_1: '11007029',
  PHONE_EXIST_IN_ORGANIZATION: '11001030',
  EMAIL_EXIST_IN_ORGANIZATION: '11001031',
  NOT_VALID_ORGANIZATION_OBJECT_ID: '11001033',
  ORGANIZATION_NOT_FOUND: '11001033',
  ORGANIZATION_IS_HAS_EMPLOYEE: '11007044',
  ORGANIZATION_IS_MANAGEMENT: '11007034',
  // 01/05 => Employee
  NOT_VALID_DIRECT_MANAGER_OBJECT_ID: '11008035',
  DIRECT_MANAGER_NOT_FOUND: '11008036',
  CONTRACT_START_DATE_MUST_BEFORE_END_DATE: '11008037',
  PHONE_EXIST_IN_EMPLOYEEE: '11008038',
  BIRTHDAY_MUST_BEFORE_NOW: '11001039',
  EMAIL_HAS_REGISTER_FOR_OTHER_EMPLOYEE: '11008040',
  EMERGENCY_CONTACT_PHONE_IS_INVALID: '11008041',
  CAN_NOT_CREATE_USER_AUTH: '11002042',
  USER_NAME_IS_EXISTED: '11002043',
  EMPLOYEE_NOT_FOUND: '11008045',
  NOT_VALID_OBJECT_ID: '11001009',
  UNKNOWN: '99999999',
} as const;

type TStatusCode = Record<
  (typeof StringMappingToStatusCode)[keyof typeof StringMappingToStatusCode],
  keyof typeof StringMappingToStatusCode
>;
const StatusCodeMappingToString: TStatusCode = Object.fromEntries(
  Object.entries(StringMappingToStatusCode).map(([key, value]) => {
    return [value, key];
  }),
) as TStatusCode;

export const handleGetMessageToToast = (
  t: TFunction<any[]>,
  actionResponse: SimpleResponse<any, any> | SerializeFrom<SimpleResponse<any, any>>,
): ReactNode => {
  const { hasError, errorCode, error } = actionResponse;
  if (!hasError) {
    return undefined;
  }
  if (error) {
    return (
      <div className="list-disc">
        {error.split(SEPARATOR).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
    );
  }
  if (!errorCode) {
    return t('error_message:UNKNOWN');
  }
  const errorType = StatusCodeMappingToString[errorCode as keyof typeof StatusCodeMappingToString];
  if (!errorType) {
    return error ?? t('error_message:UNKNOWN');
  }
  return t(`error_message:${errorType}`);
};
