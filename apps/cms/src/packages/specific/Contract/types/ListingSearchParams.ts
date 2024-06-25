import { lisitngUrlSearchParamsUtils } from '../utils/lisitngUrlSearchParamsUtils';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/packages/base/types/GetTypeOfSearchParamsFromUrlParamsUtils';

export type ListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<typeof lisitngUrlSearchParamsUtils>;
