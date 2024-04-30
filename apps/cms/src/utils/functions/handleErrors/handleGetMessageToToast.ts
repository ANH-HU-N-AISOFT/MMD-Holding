import type { TFunction } from 'i18next';
import type { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { SerializeFrom } from '~/overrides/@remix';

const StringMappingToStatusCode = {
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
  actionResponse: SimpleActionResponse<any, any> | SerializeFrom<SimpleActionResponse<any, any>>,
) => {
  const { hasError, errorCode } = actionResponse;
  if (!hasError || !errorCode) {
    return undefined;
  }
  const errorType = StatusCodeMappingToString[errorCode as keyof typeof StatusCodeMappingToString];
  if (!errorType) {
    return t('error_message:UNKNOWN');
  }
  return t(`error_message:${errorType}`);
};
