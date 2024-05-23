import { notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteDiscountResponse,
  action as actionDeleteDiscount,
} from './_dashboard.discount.$id.delete';
import { ModalImport } from '~/components/Listing/ModalImport/ModalImport';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormSearchNFilter } from '~/packages/specific/Discount/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Discount/components/Listing/Header';
import { Table } from '~/packages/specific/Discount/components/Listing/Table';
import { Discount } from '~/packages/specific/Discount/models/Discount';
import { getDiscounts } from '~/packages/specific/Discount/services/getDiscounts';
import { ListingSearchParams } from '~/packages/specific/Discount/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Discount/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Discount>>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });
  const t = i18next.t;
  const { search, page = 1 } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getDiscounts({
      page,
      query: search,
      sortByName: search ? 1 : undefined,
    });

    return json({
      info: {
        hits: response.items,
        pagination: {
          totalPages: response.headers['x-pages-count'],
          totalRecords: response.headers['x-total-count'],
          pageSize: response.headers['x-per-page'],
        },
      },
      page: Math.min(page, response.headers['x-pages-count'] || 1),
    });
  } catch (error) {
    return json({
      page,
      info: {
        hits: [],
        pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
      },
      toastMessage: handleGetMessageToToast(t, handleCatchClauseSimpleAtClient(error)),
    });
  }
};

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['discount']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/discount' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Discount, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Import
  const [isOpenModalImport, setIsOpenModalImport] = useState(false);
  //#endregion

  //#region Export
  const exportDiscountsFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportDiscountsFetcher.state === 'loading' || exportDiscountsFetcher.state === 'submitting';
  }, [exportDiscountsFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportDiscountsFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/discount/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportDiscountsFetcher.data && exportDiscountsFetcher.state === 'idle') {
      const response = exportDiscountsFetcher.data as ActionDeleteDiscountResponse;
      if (response.hasError) {
        notification.error({
          message: t('discount:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportDiscountsFetcher.state]);
  //#endregion

  //#region Delete
  const deleteDiscountFetcher = useFetcher<typeof actionDeleteDiscount>();

  const isDeleting = useMemo(() => {
    return deleteDiscountFetcher.state === 'loading' || deleteDiscountFetcher.state === 'submitting';
  }, [deleteDiscountFetcher]);
  const [isOpenModalDeleteDiscount, setIsOpenModalDeleteDiscount] = useState<string | false>(false);

  const handleDelete = () => {
    deleteDiscountFetcher.submit({}, { method: 'DELETE', action: `/discount/${isOpenModalDeleteDiscount}/delete` });
  };

  useEffect(() => {
    if (deleteDiscountFetcher.data && deleteDiscountFetcher.state === 'idle') {
      const response = deleteDiscountFetcher.data as ActionDeleteDiscountResponse;
      if (response.hasError) {
        notification.error({
          message: t('discount:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('discount:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteDiscount(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteDiscountFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          creatable={isCanShow({ accept: [Role.Admin] })}
          importable={false}
          exportable={false}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/discount/create')}
          onImport={() => setIsOpenModalImport(true)}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{}}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow({ accept: [Role.Admin] })}
          editable={isCanShow({ accept: [Role.Admin] })}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteDiscount(data)}
          onEdit={record => navigate(`/discount/${record.id}/edit`)}
          onView={record => navigate(`/discount/${record.id}/detail`)}
        />
      </div>
      <ModalImport
        downSampleUrl=""
        open={isOpenModalImport}
        onCancel={() => setIsOpenModalImport(false)}
        onOk={() => alert('Coming soon')}
      />
      <ModalConfirmDelete
        open={!!isOpenModalDeleteDiscount}
        onCancel={() => setIsOpenModalDeleteDiscount(false)}
        onOk={handleDelete}
        title={t('discount:delete_title')}
        description={t('discount:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
