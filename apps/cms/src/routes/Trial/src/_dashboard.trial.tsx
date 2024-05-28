import { notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteTrialResponse,
  action as actionDeleteTrial,
} from './_dashboard.trial.$id.delete';
import { ModalImport } from '~/components/Listing/ModalImport/ModalImport';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormSearchNFilter } from '~/packages/specific/Trial/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Trial/components/Listing/Header';
import { Table } from '~/packages/specific/Trial/components/Listing/Table';
import { Trial } from '~/packages/specific/Trial/models/Trial';
import { getTrials } from '~/packages/specific/Trial/services/getTrials';
import { ListingSearchParams } from '~/packages/specific/Trial/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Trial/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Trial>>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });
  const t = i18next.t;
  const { search, page = 1, status } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getTrials({
      page,
      query: search,
      status,
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
  const { t } = useTranslation(['trial']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/trial' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Trial, ListingSearchParams>({
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
  const exportTrialsFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportTrialsFetcher.state === 'loading' || exportTrialsFetcher.state === 'submitting';
  }, [exportTrialsFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportTrialsFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/trial/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportTrialsFetcher.data && exportTrialsFetcher.state === 'idle') {
      const response = exportTrialsFetcher.data as ActionDeleteTrialResponse;
      if (response.hasError) {
        notification.error({
          message: t('trial:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportTrialsFetcher.state]);
  //#endregion

  //#region Delete
  const deleteTrialFetcher = useFetcher<typeof actionDeleteTrial>();

  const isDeleting = useMemo(() => {
    return deleteTrialFetcher.state === 'loading' || deleteTrialFetcher.state === 'submitting';
  }, [deleteTrialFetcher]);
  const [isOpenModalDeleteTrial, setIsOpenModalDeleteTrial] = useState<string | false>(false);

  const handleDelete = () => {
    deleteTrialFetcher.submit({}, { method: 'DELETE', action: `/trial/${isOpenModalDeleteTrial}/delete` });
  };

  useEffect(() => {
    if (deleteTrialFetcher.data && deleteTrialFetcher.state === 'idle') {
      const response = deleteTrialFetcher.data as ActionDeleteTrialResponse;
      if (response.hasError) {
        notification.error({
          message: t('trial:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('trial:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteTrial(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTrialFetcher.state]);
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
          onCreate={() => navigate('/trial/create')}
          onImport={() => setIsOpenModalImport(true)}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            status: paramsInUrl.status,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
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
          onDelete={data => setIsOpenModalDeleteTrial(data)}
          onEdit={record => navigate(`/trial/${record.id}/edit`)}
          onView={record => navigate(`/trial/${record.id}/detail`)}
        />
      </div>
      <ModalImport
        downSampleUrl=""
        open={isOpenModalImport}
        onCancel={() => setIsOpenModalImport(false)}
        onOk={() => alert('Coming soon')}
      />
      <ModalConfirmDelete
        open={!!isOpenModalDeleteTrial}
        onCancel={() => setIsOpenModalDeleteTrial(false)}
        onOk={handleDelete}
        title={t('trial:delete_title')}
        description={t('trial:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
