import { notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeletePromotionResponse,
  action as actionDeletePromotion,
} from './_dashboard.promotion.$id.delete';
import { ModalImport } from '~/components/Listing/ModalImport/ModalImport';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormSearchNFilter } from '~/packages/specific/Promotion/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Promotion/components/Listing/Header';
import { Table } from '~/packages/specific/Promotion/components/Listing/Table';
import { Promotion } from '~/packages/specific/Promotion/models/Promotion';
import { getPromotions } from '~/packages/specific/Promotion/services/getPromotions';
import { ListingSearchParams } from '~/packages/specific/Promotion/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Promotion/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Promotion>>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });
  const t = i18next.t;
  const { search, page = 1, endDate, promotionType, startDate, status } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getPromotions({
      page,
      query: search,
      sortByName: search ? 1 : undefined,
      endDate,
      promotionTypes: promotionType,
      startDate,
      status,
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
  const { t } = useTranslation(['promotion']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/promotion' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Promotion, ListingSearchParams>({
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
  const exportPromotionsFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportPromotionsFetcher.state === 'loading' || exportPromotionsFetcher.state === 'submitting';
  }, [exportPromotionsFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportPromotionsFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/promotion/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportPromotionsFetcher.data && exportPromotionsFetcher.state === 'idle') {
      const response = exportPromotionsFetcher.data as ActionDeletePromotionResponse;
      if (response.hasError) {
        notification.error({
          message: t('promotion:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportPromotionsFetcher.state]);
  //#endregion

  //#region Delete
  const deletePromotionFetcher = useFetcher<typeof actionDeletePromotion>();

  const isDeleting = useMemo(() => {
    return deletePromotionFetcher.state === 'loading' || deletePromotionFetcher.state === 'submitting';
  }, [deletePromotionFetcher]);
  const [isOpenModalDeletePromotion, setIsOpenModalDeletePromotion] = useState<string | false>(false);

  const handleDelete = () => {
    deletePromotionFetcher.submit({}, { method: 'DELETE', action: `/promotion/${isOpenModalDeletePromotion}/delete` });
  };

  useEffect(() => {
    if (deletePromotionFetcher.data && deletePromotionFetcher.state === 'idle') {
      const response = deletePromotionFetcher.data as ActionDeletePromotionResponse;
      if (response.hasError) {
        notification.error({
          message: t('promotion:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('promotion:delete_success') });
        handleRequest({});
        setIsOpenModalDeletePromotion(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletePromotionFetcher.state]);
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
          onCreate={() => navigate('/promotion/create')}
          onImport={() => setIsOpenModalImport(true)}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            endDate: paramsInUrl.endDate,
            promotionType: paramsInUrl.promotionType,
            startDate: paramsInUrl.startDate,
            status: paramsInUrl.status,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              endDate: undefined,
              promotionType: undefined,
              startDate: undefined,
              status: undefined,
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
          onDelete={data => setIsOpenModalDeletePromotion(data)}
          onEdit={record => navigate(`/promotion/${record.id}/edit`)}
          onView={record => navigate(`/promotion/${record.id}/detail`)}
        />
      </div>
      <ModalImport
        downSampleUrl=""
        open={isOpenModalImport}
        onCancel={() => setIsOpenModalImport(false)}
        onOk={() => alert('Coming soon')}
      />
      <ModalConfirmDelete
        open={!!isOpenModalDeletePromotion}
        onCancel={() => setIsOpenModalDeletePromotion(false)}
        onOk={handleDelete}
        title={t('promotion:delete_title')}
        description={t('promotion:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;