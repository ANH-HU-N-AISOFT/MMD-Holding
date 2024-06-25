import { equals, keys, pick, reject } from 'ramda';

interface GetCountForFilterDrawer<T extends Record<string, any>> {
  formFilterValues: T;
  fieldKeys: Array<keyof T>;
}

export const getCountForFilterDrawer = <T extends Record<string, any>>({
  formFilterValues,
  fieldKeys,
}: GetCountForFilterDrawer<T>) => {
  const formFilterValuesRemovedUndefinedKeys = reject(equals(undefined))(formFilterValues);
  return keys(pick(fieldKeys, formFilterValuesRemovedUndefinedKeys)).length;
};
