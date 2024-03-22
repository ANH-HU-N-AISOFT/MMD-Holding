import { urlSearchParamsUtils } from '../components/Listing/utils/urlSearchParamsUtils';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/packages/@base/types/GetTypeOfSearchParamsFromUrlParamsUtils';

export type SearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<typeof urlSearchParamsUtils>;
