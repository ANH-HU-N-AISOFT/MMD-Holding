import { notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteContractTemplateResponse,
  action as actionDeleteContractTemplate,
} from './_dashboard.contract-template.$id.delete';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormSearchNFilter } from '~/packages/specific/ContractTemplate/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/ContractTemplate/components/Listing/Header';
import { Table } from '~/packages/specific/ContractTemplate/components/Listing/Table';
import { ContractTemplate } from '~/packages/specific/ContractTemplate/models/ContractTemplate';
import { getContractTemplates } from '~/packages/specific/ContractTemplate/services/getContractTemplates';
import { ListingSearchParams } from '~/packages/specific/ContractTemplate/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/ContractTemplate/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<ContractTemplate>>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin], not: [Role.SuperAdmin] });
  const t = i18next.t;
  const { search, page = 1 } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getContractTemplates({
      page,
      query: search,
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
  const { t } = useTranslation(['contract_template']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/contract-template' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<ContractTemplate, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Export
  const exportContractTemplatesFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportContractTemplatesFetcher.state === 'loading' || exportContractTemplatesFetcher.state === 'submitting';
  }, [exportContractTemplatesFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportContractTemplatesFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/contract-template/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportContractTemplatesFetcher.data && exportContractTemplatesFetcher.state === 'idle') {
      const response = exportContractTemplatesFetcher.data as ActionDeleteContractTemplateResponse;
      if (response.hasError) {
        notification.error({
          message: t('contract_template:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportContractTemplatesFetcher.state]);
  //#endregion

  //#region Delete
  const deleteContractTemplateFetcher = useFetcher<typeof actionDeleteContractTemplate>();

  const isDeleting = useMemo(() => {
    return deleteContractTemplateFetcher.state === 'loading' || deleteContractTemplateFetcher.state === 'submitting';
  }, [deleteContractTemplateFetcher]);
  const [isOpenModalDeleteContractTemplate, setIsOpenModalDeleteContractTemplate] = useState<string | false>(false);

  const handleDelete = () => {
    deleteContractTemplateFetcher.submit(
      {},
      { method: 'DELETE', action: `/contract-template/${isOpenModalDeleteContractTemplate}/delete` },
    );
  };

  useEffect(() => {
    if (deleteContractTemplateFetcher.data && deleteContractTemplateFetcher.state === 'idle') {
      const response = deleteContractTemplateFetcher.data as ActionDeleteContractTemplateResponse;
      if (response.hasError) {
        notification.error({
          message: t('contract_template:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('contract_template:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteContractTemplate(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteContractTemplateFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          creatable={isCanShow({ accept: [Role.SuperAdmin] })}
          importable={false}
          exportable={false}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/contract-template/create')}
          onImport={() => undefined}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{}}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({ page: 1 });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow({ accept: [Role.SuperAdmin] })}
          editable={isCanShow({ accept: [Role.SuperAdmin] })}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteContractTemplate(data)}
          onEdit={record => navigate(`/contract-template/${record.id}/edit`)}
          onView={record => navigate(`/contract-template/${record.id}/detail`)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteContractTemplate}
        onCancel={() => setIsOpenModalDeleteContractTemplate(false)}
        onOk={handleDelete}
        title={t('contract_template:delete_title')}
        description={t('contract_template:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
