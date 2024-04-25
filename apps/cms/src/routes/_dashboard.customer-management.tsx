import { ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, redirect, useFetcher, useLoaderData } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { FormSearchNFilter } from '~/packages/specific/CustomerManagement/components/FormSearchNFilter/FormSearchNFilter';
import { Listing } from '~/packages/specific/CustomerManagement/components/Listing/Listing';
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
      {/* FIXME: Tách thành 1 component UI */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="text-2xl font-semibold">Khách hàng</div>
        <div className="flex items-center gap-2">
          <Button icon={<ExportOutlined />}>Export</Button>
          <Button className="hidden sm:block" icon={<ImportOutlined />}>
            Import
          </Button>
          <Button icon={<PlusOutlined />} type="primary">
            Thêm mới
          </Button>
        </div>
      </div>
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
      <Listing
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
