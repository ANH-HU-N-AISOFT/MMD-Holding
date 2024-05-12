import { createUrlSearchParamsUtils } from '../utils/createUrlSearchParamsUtils';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/packages/@base/types/GetTypeOfSearchParamsFromUrlParamsUtils';

export type CreateSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<typeof createUrlSearchParamsUtils>;
