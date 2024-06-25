import { isEmpty } from 'ramda';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { notification } from 'reactjs';
import { AnyRecord } from 'typescript-utilities';
import { UrlSearchParamsUtils } from 'utilities';
import { SimpleListingLoaderResponse } from '../types/SimpleListingLoaderResponse';
import { FetcherWithComponents, SerializeObject, UndefinedToOptional } from '~/overrides/@remix';

interface UseListingData<T extends AnyRecord, SearchParams extends AnyRecord & { page?: number }> {
  loaderData: SerializeObject<UndefinedToOptional<SimpleListingLoaderResponse<T>>>;
  fetcherData: FetcherWithComponents<SerializeObject<UndefinedToOptional<SimpleListingLoaderResponse<T>>>>;
  getNearestPageAvailable: (page: number) => void;
  urlSearchParamsUtils: UrlSearchParamsUtils<SearchParams>;
}

export const useListingData = <T extends AnyRecord, SearchParams extends AnyRecord & { page?: number }>({
  loaderData,
  fetcherData,
  getNearestPageAvailable,
  urlSearchParamsUtils,
}: UseListingData<T, SearchParams>) => {
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
    if (loaderData.toastMessageError) {
      notification.error({
        message: loaderData.toastMessageError as ReactNode,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return {
    data,
    isFetchingList,
  };
};
