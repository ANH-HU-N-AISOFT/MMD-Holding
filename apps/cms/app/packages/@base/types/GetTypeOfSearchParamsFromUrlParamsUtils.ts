import { GetGeneric } from 'typescript-utilities';
import { UrlSearchParamsUtils } from 'utilities';
import { TypeOf } from 'zod';

export type GetTypeOfSearchParamsFromUrlParamsUtils<T extends UrlSearchParamsUtils<any>> = TypeOf<
  // @ts-ignore
  GetGeneric<Exclude<T['_zodSchema'], undefined>>
>;
