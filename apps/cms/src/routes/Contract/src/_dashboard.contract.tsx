import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteContractResponse,
  action as actionDeleteContract,
} from './_dashboard.contract.$id.delete';
import {
  isCanCreateContract,
  isCanDeleteContract,
  isCanEditContract,
  isCanExportContract,
  isCanImportContract,
  isCanReadContract,
} from './utils/Is';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/base/types/SimpleListingLoaderResponse';
import { FormSearchNFilter } from '~/packages/specific/Contract/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Contract/components/Listing/Header';
import { Table } from '~/packages/specific/Contract/components/Listing/Table';
import { Contract } from '~/packages/specific/Contract/models/Contract';
import { getContracts } from '~/packages/specific/Contract/services/getContracts';
import { ListingSearchParams } from '~/packages/specific/Contract/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Contract/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Contract>>> => {
  await isCanAccessRoute(isCanReadContract);
  const t = i18next.t;
  const { search, page = 1, endDate, startDate } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getContracts({
      page,
      query: search,
      endDate,
      startDate,
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
      toastMessage: handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error)),
    });
  }
};

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['contract']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/contract' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Contract, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Delete
  const deleteContractFetcher = useFetcher<typeof actionDeleteContract>();

  const isDeleting = useMemo(() => {
    return deleteContractFetcher.state === 'loading' || deleteContractFetcher.state === 'submitting';
  }, [deleteContractFetcher]);
  const [isOpenModalDeleteContract, setIsOpenModalDeleteContract] = useState<string | false>(false);

  const handleDelete = () => {
    deleteContractFetcher.submit({}, { method: 'DELETE', action: `/contract/${isOpenModalDeleteContract}/delete` });
  };

  useEffect(() => {
    if (deleteContractFetcher.data && deleteContractFetcher.state === 'idle') {
      const response = deleteContractFetcher.data as ActionDeleteContractResponse;
      if (response.hasError) {
        notification.error({
          message: t('contract:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('contract:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteContract(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteContractFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          creatable={isCanShow(isCanCreateContract)}
          importable={isCanShow(isCanImportContract)}
          exportable={isCanShow(isCanExportContract)}
          isExporting={false}
          onExport={() => notification.info({ message: 'Chức năng đang phát triển' })}
          onCreate={() => navigate('/contract/create')}
          onImport={() => notification.info({ message: 'Chức năng đang phát triển' })}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            endDate: paramsInUrl.endDate,
            startDate: paramsInUrl.startDate,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              endDate: undefined,
              startDate: undefined,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow(isCanDeleteContract)}
          editable={isCanShow(isCanEditContract)}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteContract(data)}
          onEdit={record => navigate(`/contract/${record.id}/edit`)}
          onView={record => navigate(`/contract/${record.id}/detail`)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteContract}
        onCancel={() => setIsOpenModalDeleteContract(false)}
        onOk={handleDelete}
        title={t('contract:delete_title')}
        description={t('contract:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
