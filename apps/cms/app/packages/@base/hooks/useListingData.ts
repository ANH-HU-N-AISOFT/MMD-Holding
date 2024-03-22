import { isEmpty } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { AnyRecord } from 'typescript-utilities';
import { SimpleListingLoaderResponse } from '../types/SimpleListingLoaderResponse';
import type { FetcherWithComponents } from '@remix-run/react';
import { urlSearchParamsUtils } from '~/packages/specific/Course/components/Listing/utils/urlSearchParamsUtils';

interface UseListingData<T extends AnyRecord> {
  loaderData: SimpleListingLoaderResponse<T>;
  fetcherData: FetcherWithComponents<SimpleListingLoaderResponse<T>>;
  getNearestPageAvailable: (page: number) => void;
}

export const useListingData = <T extends AnyRecord>({
  loaderData,
  fetcherData,
  getNearestPageAvailable,
}: UseListingData<T>) => {
  const [data, setData] = useState(loaderData);

  const isFetchingList = useMemo(() => {
    return fetcherData.state === 'loading' || fetcherData.state === 'submitting';
  }, [fetcherData.state]);

  useEffect(() => {
    if (fetcherData.data) {
      const paramsInUrl = urlSearchParamsUtils.decrypt(urlSearchParamsUtils.getUrlSearchParams().toString());
      const page = paramsInUrl.page ?? 1;
      if (isEmpty(fetcherData.data.info.hits) && page !== fetcherData.data.page) {
        const nextPage = page > 1 ? page - 1 : 1;
        getNearestPageAvailable(nextPage);
      } else {
        setData(fetcherData.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherData.data]);

  useEffect(() => {
    if (loaderData) {
      const paramsInUrl = urlSearchParamsUtils.decrypt(urlSearchParamsUtils.getUrlSearchParams().toString());
      const page = paramsInUrl.page ?? 1;
      if (isEmpty(loaderData.info.hits) && page !== loaderData.page) {
        const nextPage = page > 1 ? page - 1 : 1;
        getNearestPageAvailable(nextPage);
      } else {
        setData(loaderData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return {
    data,
    isFetchingList,
  };
};
