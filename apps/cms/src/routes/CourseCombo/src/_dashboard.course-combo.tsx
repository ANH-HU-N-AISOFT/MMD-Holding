import { notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteCourseResponse,
  action as actionDeleteCourse,
} from './_dashboard.course-combo.$id.delete';
import { ModalImport } from '~/components/Listing/ModalImport/ModalImport';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormSearchNFilter } from '~/packages/specific/CourseCombo/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/CourseCombo/components/Listing/Header';
import { Table } from '~/packages/specific/CourseCombo/components/Listing/Table';
import { CourseCombo } from '~/packages/specific/CourseCombo/models/CourseCombo';
import { getCourseCombos } from '~/packages/specific/CourseCombo/services/getCourseCombos';
import { ListingSearchParams } from '~/packages/specific/CourseCombo/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/CourseCombo/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<CourseCombo>>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin], not: [Role.SuperAdmin] });
  const t = i18next.t;
  const { search, page = 1, status } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getCourseCombos({
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
  const { t } = useTranslation(['course_combo']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/course-combo' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<CourseCombo, ListingSearchParams>({
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
  const exportCoursesFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportCoursesFetcher.state === 'loading' || exportCoursesFetcher.state === 'submitting';
  }, [exportCoursesFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportCoursesFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/course-combo/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportCoursesFetcher.data && exportCoursesFetcher.state === 'idle') {
      const response = exportCoursesFetcher.data as ActionDeleteCourseResponse;
      if (response.hasError) {
        notification.error({
          message: t('course_combo:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportCoursesFetcher.state]);
  //#endregion

  //#region Delete
  const deleteCourseFetcher = useFetcher<typeof actionDeleteCourse>();

  const isDeleting = useMemo(() => {
    return deleteCourseFetcher.state === 'loading' || deleteCourseFetcher.state === 'submitting';
  }, [deleteCourseFetcher]);
  const [isOpenModalDeleteCourse, setIsOpenModalDeleteCourse] = useState<string | false>(false);

  const handleDelete = () => {
    deleteCourseFetcher.submit({}, { method: 'DELETE', action: `/course-combo/${isOpenModalDeleteCourse}/delete` });
  };

  useEffect(() => {
    if (deleteCourseFetcher.data && deleteCourseFetcher.state === 'idle') {
      const response = deleteCourseFetcher.data as ActionDeleteCourseResponse;
      if (response.hasError) {
        notification.error({
          message: t('course_combo:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('course_combo:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteCourse(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCourseFetcher.state]);
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
          onCreate={() => navigate('/course-combo/create')}
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
          deletable={isCanShow({ accept: [Role.SuperAdmin] })}
          editable={isCanShow({ accept: [Role.SuperAdmin] })}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteCourse(data)}
          onEdit={record => navigate(`/course-combo/${record.id}/edit`)}
          onView={record => navigate(`/course-combo/${record.id}/detail`)}
          onViewRoadMap={roadmap => window.open(`/course-roadmap/${roadmap.id}/detail`)}
        />
      </div>
      <ModalImport
        downSampleUrl=""
        open={isOpenModalImport}
        onCancel={() => setIsOpenModalImport(false)}
        onOk={() => alert('Coming soon')}
      />
      <ModalConfirmDelete
        open={!!isOpenModalDeleteCourse}
        onCancel={() => setIsOpenModalDeleteCourse(false)}
        onOk={handleDelete}
        title={t('course_combo:delete_title')}
        description={t('course_combo:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
