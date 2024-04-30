import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, redirect, useFetcher, useLoaderData } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { FormSearchNFilter } from '~/packages/specific/CustomerManagement/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/CustomerManagement/components/Listing/Header';
import { Table } from '~/packages/specific/CustomerManagement/components/Listing/Table';
import { CustomerManagement } from '~/packages/specific/CustomerManagement/models/CustomerManagement';
import { getCustomers } from '~/packages/specific/CustomerManagement/services/getCustomers';
import { ListingSearchParams } from '~/packages/specific/CustomerManagement/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/CustomerManagement/utils/lisitngUrlSearchParamsUtils';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<CustomerManagement>>> => {
  const { page = 1, pageSize = 8 } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getCustomers({ page, pageSize });

    return json({
      info: {
        hits: response.getCustomers.hits,
        pagination: response.getCustomers.pagination,
      },
      page: Math.min(page, response.getCustomers.pagination.totalPages || 1),
    });
  } catch (error) {
    console.log(error);
    return redirect('/500', { reason: '' });
  }
};

export const Page = () => {
  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/customer-management' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<CustomerManagement, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  return (
    <div className="flex flex-col h-full">
      <Header />
      <FormSearchNFilter
        searchValue={paramsInUrl.search?.toString()}
        formFilterValues={{
          status: paramsInUrl.status,
        }}
        isSubmiting={isFetchingList}
        onFilter={values => handleRequest({ page: 1, status: values.status })}
        onResetFilter={() => handleRequest({ page: 1, status: undefined })}
        onSearch={value => handleRequest({ page: 1, search: value })}
      />
      <Table
        loading={isFetchingList}
        currentPage={data.page}
        pageSize={10}
        totalRecords={data.info.pagination.totalRecords}
        dataSource={data.info.hits}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
