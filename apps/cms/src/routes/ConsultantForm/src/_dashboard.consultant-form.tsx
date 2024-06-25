import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteConsultantFormResponse,
  action as actionDeleteConsultantForm,
} from './_dashboard.consultant-form.$id.delete';
import {
  isCanCreateConsultantForm,
  isCanDeleteConsultantForm,
  isCanEditConsultantForm,
  isCanExportConsultantForm,
  isCanImportConsultantForm,
  isCanReadConsultantForm,
} from './utils/Is';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/base/types/SimpleListingLoaderResponse';
import { FormSearchNFilter } from '~/packages/specific/ConsultantForm/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/ConsultantForm/components/Listing/Header';
import { Table } from '~/packages/specific/ConsultantForm/components/Listing/Table';
import { ConsultantForm } from '~/packages/specific/ConsultantForm/models/ConsultantForm';
import { getConsultantForms } from '~/packages/specific/ConsultantForm/services/getConsultantForms';
import { ListingSearchParams } from '~/packages/specific/ConsultantForm/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/ConsultantForm/utils/lisitngUrlSearchParamsUtils';
import { createUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/createUrlSearchParamsUtils';
import { isCanCreateTrialRequest } from '~/routes/TrialRequest/src/utils/Is';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<ConsultantForm>>> => {
  await isCanAccessRoute(isCanReadConsultantForm);
  const t = i18next.t;
  const { search, page = 1, courseRoadmapId, status } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getConsultantForms({
      page,
      query: search,
      sortByName: search ? 1 : undefined,
      courseRoadmapId,
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
      toastMessage: handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error)),
    });
  }
};

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['consultant_form']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/consultant-form' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<ConsultantForm, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Export
  const exportConsultantFormsFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportConsultantFormsFetcher.state === 'loading' || exportConsultantFormsFetcher.state === 'submitting';
  }, [exportConsultantFormsFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportConsultantFormsFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/consultant-form/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportConsultantFormsFetcher.data && exportConsultantFormsFetcher.state === 'idle') {
      const response = exportConsultantFormsFetcher.data as ActionDeleteConsultantFormResponse;
      if (response.hasError) {
        notification.error({
          message: t('consultant_form:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportConsultantFormsFetcher.state]);
  //#endregion

  //#region Delete
  const deleteConsultantFormFetcher = useFetcher<typeof actionDeleteConsultantForm>();

  const isDeleting = useMemo(() => {
    return deleteConsultantFormFetcher.state === 'loading' || deleteConsultantFormFetcher.state === 'submitting';
  }, [deleteConsultantFormFetcher]);
  const [isOpenModalDeleteConsultantForm, setIsOpenModalDeleteConsultantForm] = useState<string | false>(false);

  const handleDelete = () => {
    deleteConsultantFormFetcher.submit(
      {},
      { method: 'DELETE', action: `/consultant-form/${isOpenModalDeleteConsultantForm}/delete` },
    );
  };

  useEffect(() => {
    if (deleteConsultantFormFetcher.data && deleteConsultantFormFetcher.state === 'idle') {
      const response = deleteConsultantFormFetcher.data as ActionDeleteConsultantFormResponse;
      if (response.hasError) {
        notification.error({
          message: t('consultant_form:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('consultant_form:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteConsultantForm(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteConsultantFormFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          creatable={isCanShow(isCanCreateConsultantForm)}
          importable={isCanShow(isCanImportConsultantForm)}
          exportable={isCanShow(isCanExportConsultantForm)}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/consultant-form/create')}
          onImport={() => notification.info({ message: 'Chức năng đang được phát triển' })}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            courseRoadmapId: paramsInUrl.courseRoadmapId,
            status: paramsInUrl.status,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              courseRoadmapId: undefined,
              status: undefined,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow(isCanDeleteConsultantForm)}
          editable={isCanShow(isCanEditConsultantForm)}
          trialCreatable={isCanShow(isCanCreateTrialRequest)}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteConsultantForm(data)}
          onEdit={record => navigate(`/consultant-form/${record.id}/edit`)}
          onView={record => navigate(`/consultant-form/${record.id}/detail`)}
          onCreateTrial={record => {
            const createSearchParams = createUrlSearchParamsUtils.encrypt({ studentId: record.student?.id });
            navigate(`/trial-request/create${createSearchParams}`);
          }}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteConsultantForm}
        onCancel={() => setIsOpenModalDeleteConsultantForm(false)}
        onOk={handleDelete}
        title={t('consultant_form:delete_title')}
        description={t('consultant_form:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
