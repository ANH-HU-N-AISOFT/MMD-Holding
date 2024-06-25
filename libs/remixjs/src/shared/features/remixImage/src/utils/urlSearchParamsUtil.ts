import { UrlSearchParamsUtils } from 'utilities';
import { transformOptions } from './transformOptionsSchema';

export const urlSearchParamsUtil = new UrlSearchParamsUtils({
  zodSchema: transformOptions,
});
