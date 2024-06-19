import { notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteDocumentTemplateResponse,
  action as actionDeleteDocumentTemplate,
} from './_dashboard.document-template.$id.delete';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormSearchNFilter } from '~/packages/specific/DocumentTemplate/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/DocumentTemplate/components/Listing/Header';
import { Table } from '~/packages/specific/DocumentTemplate/components/Listing/Table';
import { DocumentTemplate } from '~/packages/specific/DocumentTemplate/models/DocumentTemplate';
import { getDocumentTemplates } from '~/packages/specific/DocumentTemplate/services/getDocumentTemplates';
import { ListingSearchParams } from '~/packages/specific/DocumentTemplate/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/DocumentTemplate/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<DocumentTemplate>>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Lecturer, Role.Sale] });
  const t = i18next.t;
  const { search, page = 1, createdAt, status, type } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getDocumentTemplates({
      page,
      query: search,
      createdAt,
      status,
      type,
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
  const { t } = useTranslation(['document_template']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/document-template' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<DocumentTemplate, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Export
  const exportDocumentTemplatesFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportDocumentTemplatesFetcher.state === 'loading' || exportDocumentTemplatesFetcher.state === 'submitting';
  }, [exportDocumentTemplatesFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportDocumentTemplatesFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/document-template/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportDocumentTemplatesFetcher.data && exportDocumentTemplatesFetcher.state === 'idle') {
      const response = exportDocumentTemplatesFetcher.data as ActionDeleteDocumentTemplateResponse;
      if (response.hasError) {
        notification.error({
          message: t('document_template:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportDocumentTemplatesFetcher.state]);
  //#endregion

  //#region Delete
  const deleteDocumentTemplateFetcher = useFetcher<typeof actionDeleteDocumentTemplate>();

  const isDeleting = useMemo(() => {
    return deleteDocumentTemplateFetcher.state === 'loading' || deleteDocumentTemplateFetcher.state === 'submitting';
  }, [deleteDocumentTemplateFetcher]);
  const [isOpenModalDeleteDocumentTemplate, setIsOpenModalDeleteDocumentTemplate] = useState<string | false>(false);

  const handleDelete = () => {
    deleteDocumentTemplateFetcher.submit(
      {},
      { method: 'DELETE', action: `/document-template/${isOpenModalDeleteDocumentTemplate}/delete` },
    );
  };

  useEffect(() => {
    if (deleteDocumentTemplateFetcher.data && deleteDocumentTemplateFetcher.state === 'idle') {
      const response = deleteDocumentTemplateFetcher.data as ActionDeleteDocumentTemplateResponse;
      if (response.hasError) {
        notification.error({
          message: t('document_template:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('document_template:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteDocumentTemplate(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteDocumentTemplateFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          creatable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin] })}
          importable={false}
          exportable={false}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/document-template/create')}
          onImport={() => undefined}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            createdAt: paramsInUrl.createdAt,
            type: paramsInUrl.type,
            status: paramsInUrl.status,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              createdAt: undefined,
              type: undefined,
              status: undefined,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin] })}
          editable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin] })}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteDocumentTemplate(data)}
          onEdit={record => navigate(`/document-template/${record.id}/edit`)}
          onView={record => navigate(`/document-template/${record.id}/detail`)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteDocumentTemplate}
        onCancel={() => setIsOpenModalDeleteDocumentTemplate(false)}
        onOk={handleDelete}
        title={t('document_template:delete_title')}
        description={t('document_template:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
