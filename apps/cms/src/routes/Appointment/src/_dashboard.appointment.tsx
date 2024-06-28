import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteAppointmentResponse,
  action as actionDeleteAppointment,
} from './_dashboard.appointment.$id.delete';
import {
  isCanCreateAppointment,
  isCanDeleteAppointment,
  isCanEditAppointment,
  isCanExportAppointment,
  isCanImportAppointment,
  isCanReadAppointment,
} from './utils/Is';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { getTotalPages } from '~/constants/getTotalPages';
import { RecordsPerPage } from '~/constants/RecordsPerPage';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/remix';
import { useListingData } from '~/packages/base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/base/types/SimpleListingLoaderResponse';
import { FormSearchNFilter } from '~/packages/specific/Appointment/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Appointment/components/Listing/Header';
import { Table } from '~/packages/specific/Appointment/components/Listing/Table';
import { useUpdateAppointmentStatusOfRecord } from '~/packages/specific/Appointment/hooks/useUpdateAppointmentStatusOfRecord';
import { Appointment } from '~/packages/specific/Appointment/models/Appointment';
import { AppointmentStatus } from '~/packages/specific/Appointment/models/AppointmentStatus';
import { getAppointments } from '~/packages/specific/Appointment/services/getAppointments';
import { ListingSearchParams } from '~/packages/specific/Appointment/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/lisitngUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<
  TypedResponse<SimpleListingLoaderResponse<Appointment> & { counts: Record<AppointmentStatus, number> }>
> => {
  await isCanAccessRoute(isCanReadAppointment);
  const t = i18next.t;
  const { search, page = 1, organizationId, status, isOwner } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getAppointments({
      page,
      query: search,
      status: status === 'all' ? undefined : status,
      organizationIds: organizationId ? [organizationId] : undefined,
      isOwner: isOwner,
      sortByDate:
        !status || status === 'all'
          ? undefined
          : [AppointmentStatus.CANCELED, AppointmentStatus.LEVEL_TESTED].includes(status)
            ? -1
            : 1,
    });

    return json({
      info: {
        hits: response.items,
        pagination: {
          totalPages: getTotalPages(response.total, RecordsPerPage),
          totalRecords: response.total,
          pageSize: RecordsPerPage,
        },
      },
      page,
      counts: response.totalsByStatus,
    });
  } catch (error) {
    return json({
      page,
      info: {
        hits: [],
        pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
      },
      toastMessage: handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error)),
      counts: {
        'arrived-at-center': 0,
        'level-tested': 0,
        canceled: 0,
        confirmed: 0,
        scheduled: 0,
      },
    });
  }
};

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['appointment']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const counts = useMemo(() => {
    if (fetcherData.data?.counts) {
      return fetcherData.data?.counts;
    }
    return loaderData.counts;
  }, [loaderData, fetcherData]);

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/appointment' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Appointment, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Export
  const exportAppointmentsFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportAppointmentsFetcher.state === 'loading' || exportAppointmentsFetcher.state === 'submitting';
  }, [exportAppointmentsFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportAppointmentsFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/appointment/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportAppointmentsFetcher.data && exportAppointmentsFetcher.state === 'idle') {
      const response = exportAppointmentsFetcher.data as ActionDeleteAppointmentResponse;
      if (response.hasError) {
        notification.error({
          message: t('appointment:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportAppointmentsFetcher.state]);
  //#endregion

  //#region Delete
  const deleteAppointmentFetcher = useFetcher<typeof actionDeleteAppointment>();

  const isDeleting = useMemo(() => {
    return deleteAppointmentFetcher.state === 'loading' || deleteAppointmentFetcher.state === 'submitting';
  }, [deleteAppointmentFetcher]);
  const [isOpenModalDeleteAppointment, setIsOpenModalDeleteAppointment] = useState<string | false>(false);

  const handleDelete = () => {
    deleteAppointmentFetcher.submit(
      {},
      { method: 'DELETE', action: `/appointment/${isOpenModalDeleteAppointment}/delete` },
    );
  };

  useEffect(() => {
    if (deleteAppointmentFetcher.data && deleteAppointmentFetcher.state === 'idle') {
      const response = deleteAppointmentFetcher.data as ActionDeleteAppointmentResponse;
      if (response.hasError) {
        notification.error({
          message: t('appointment:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('appointment:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteAppointment(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAppointmentFetcher.state]);
  //#endregion

  //#region Update appointment status
  const { isLoading: isSavingAppointmentStatus, update } = useUpdateAppointmentStatusOfRecord();
  //#endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          creatable={isCanShow(isCanCreateAppointment)}
          importable={isCanShow(isCanImportAppointment)}
          exportable={isCanShow(isCanExportAppointment)}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/appointment/create')}
          onImport={() => notification.info({ message: 'Chức năng đang được phát triển' })}
        />
        <FormSearchNFilter
          counts={counts}
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            status: paramsInUrl.status,
            organizationId: paramsInUrl.organizationId,
            isOwner: paramsInUrl.isOwner,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              organizationId: undefined,
              isOwner: undefined,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow(isCanDeleteAppointment)}
          editable={isCanShow(isCanEditAppointment)}
          loading={isFetchingList || isSavingAppointmentStatus}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteAppointment(data)}
          onEdit={record => navigate(`/appointment/${record.id}/edit`)}
          onView={record => navigate(`/appointment/${record.id}/detail`)}
          onViewExpectInspectationDepartment={record => window.open(`/department/${record.organization?.id}/detail`)}
          onViewAdmin={record => window.open(`/employee/${record.admin?.id}/detail`)}
          onViewTester={record => window.open(`/employee/${record.tester?.id}/detail`)}
          onViewCreatedBy={record => window.open(`/employee/${record.createdBy?.id}/detail`)}
          onViewConsultant={record => window.open(`/employee/${record.consultant?.id}/detail`)}
          onUpdateStatus={({ record, status }) => {
            update({ id: record.id, status, revalidate: () => handleRequest({}) });
          }}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteAppointment}
        onCancel={() => setIsOpenModalDeleteAppointment(false)}
        onOk={handleDelete}
        title={t('appointment:delete_title')}
        description={t('appointment:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
