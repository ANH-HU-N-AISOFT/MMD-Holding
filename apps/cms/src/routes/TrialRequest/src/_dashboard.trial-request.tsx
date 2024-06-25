import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteTrialResponse,
  action as actionDeleteTrial,
} from './_dashboard.trial-request.$id.delete';
import {
  isCanCreateTrialRequest,
  isCanDeleteTrialRequest,
  isCanEditTrialRequest,
  isCanExportTrialRequest,
  isCanImportTrialRequest,
  isCanReadTrialRequest,
} from './utils/Is';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/base/types/SimpleListingLoaderResponse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { FormSearchNFilter } from '~/packages/specific/TrialRequest/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/TrialRequest/components/Listing/Header';
import { Table } from '~/packages/specific/TrialRequest/components/Listing/Table';
import { useUpdateTrialRequestStatusOfRecord } from '~/packages/specific/TrialRequest/hooks/useUpdateTrialRequestStatusOfRecord';
import { TrialRequest } from '~/packages/specific/TrialRequest/models/TrialRequest';
import { getTrialRequests } from '~/packages/specific/TrialRequest/services/getTrialRequests';
import { ListingSearchParams } from '~/packages/specific/TrialRequest/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<TrialRequest>>> => {
  await isCanAccessRoute(isCanReadTrialRequest);
  const t = i18next.t;
  const {
    search,
    page = 1,
    status,
    demoType,
    courseRoadmapId,
    departmentId,
    studyMode,
    isAdminOwner,
    isConsultantOwner,
    isLecturerOwner,
  } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getTrialRequests({
      page,
      query: search,
      status,
      sortByName: search ? 1 : undefined,
      courseRoadmapId: courseRoadmapId,
      demoType,
      studyMode,
      learningOrganizationId: departmentId,
      isAdminOwner,
      isConsultantOwner,
      isLecturerOwner,
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
  const { t } = useTranslation(['trial_request']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/trial-request' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<TrialRequest, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
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
        action: '/trial-request/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportTrialsFetcher.data && exportTrialsFetcher.state === 'idle') {
      const response = exportTrialsFetcher.data as ActionDeleteTrialResponse;
      if (response.hasError) {
        notification.error({
          message: t('trial_request:export_failure'),
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
    deleteTrialFetcher.submit({}, { method: 'DELETE', action: `/trial-request/${isOpenModalDeleteTrial}/delete` });
  };

  useEffect(() => {
    if (deleteTrialFetcher.data && deleteTrialFetcher.state === 'idle') {
      const response = deleteTrialFetcher.data as ActionDeleteTrialResponse;
      if (response.hasError) {
        notification.error({
          message: t('trial_request:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('trial_request:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteTrial(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTrialFetcher.state]);
  //#endregion

  //#region Update trial request status
  const { isLoading: isSavingTrialRequestStatus, update } = useUpdateTrialRequestStatusOfRecord();
  //#endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          creatable={isCanShow(isCanCreateTrialRequest)}
          importable={isCanShow(isCanImportTrialRequest)}
          exportable={isCanShow(isCanExportTrialRequest)}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/trial-request/create')}
          onImport={() => notification.info({ message: 'Chức năng đang được phát triển' })}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            demoType: paramsInUrl.demoType,
            courseRoadmapId: paramsInUrl.courseRoadmapId,
            departmentId: paramsInUrl.departmentId,
            isAdminOwner: paramsInUrl.isAdminOwner,
            isConsultantOwner: paramsInUrl.isConsultantOwner,
            isLecturerOwner: paramsInUrl.isLecturerOwner,
            studyMode: paramsInUrl.studyMode,
            status: paramsInUrl.status,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              demoType: undefined,
              courseRoadmapId: undefined,
              departmentId: undefined,
              isAdminOwner: undefined,
              isConsultantOwner: undefined,
              isLecturerOwner: undefined,
              studyMode: undefined,
              status: undefined,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow(isCanDeleteTrialRequest)}
          editable={isCanShow(isCanEditTrialRequest)}
          loading={isFetchingList || isSavingTrialRequestStatus}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteTrial(data)}
          onEdit={record => navigate(`/trial-request/${record.id}/edit`)}
          onView={record => navigate(`/trial-request/${record.id}/detail`)}
          onViewAdmin={record => window.open(`/employee/${record.admin?.id}/detail`)}
          onViewConsultant={record => window.open(`/employee/${record.consultant?.id}/detail`)}
          onViewLecture={record => window.open(`/employee/${record.lecturer?.id}/detail`)}
          onViewExpectLearningDepartment={record => {
            window.open(`/department/${record.learningOrganization?.id}/detail`);
          }}
          onUpdateStatus={({ record, status }) => {
            update({ id: record.id, status, revalidate: () => handleRequest({}) });
          }}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteTrial}
        onCancel={() => setIsOpenModalDeleteTrial(false)}
        onOk={handleDelete}
        title={t('trial_request:delete_title')}
        description={t('trial_request:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
