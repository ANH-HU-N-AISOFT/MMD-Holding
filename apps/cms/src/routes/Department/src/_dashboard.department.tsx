import { ClusterOutlined, TableOutlined } from '@ant-design/icons';
import { Select, notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteDepartmentResponse,
  action as actionDeleteDepartment,
} from './_dashboard.department.$id.delete';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { ModalImport } from '~/components/Listing/ModalImport/ModalImport';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { GetAllParams } from '~/constants/GetAllParams';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormSearchNFilter } from '~/packages/specific/Department/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Department/components/Listing/Header';
import { Table } from '~/packages/specific/Department/components/Listing/Table';
import { TableForTreeLayout } from '~/packages/specific/Department/components/Listing/TableForTreeLayout';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';
import { ListingSearchParams } from '~/packages/specific/Department/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Department/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Department>>> => {
  const t = i18next.t;
  const { page = 1, search, businessStatus, layout } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getDepartments({
      businessStatus: layout === 'tree' ? undefined : (businessStatus as BusinessStatusEnum | undefined),
      page: layout === 'tree' ? GetAllParams.page : page,
      query: layout === 'tree' ? undefined : search,
      perPage: layout === 'tree' ? GetAllParams.perPage : undefined,
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
  const { t } = useTranslation(['department']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/department' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Department, ListingSearchParams>({
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
  const exportDepartmentsFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportDepartmentsFetcher.state === 'loading' || exportDepartmentsFetcher.state === 'submitting';
  }, [exportDepartmentsFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportDepartmentsFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/department/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportDepartmentsFetcher.data && exportDepartmentsFetcher.state === 'idle') {
      const response = exportDepartmentsFetcher.data as ActionDeleteDepartmentResponse;
      if (response.hasError) {
        notification.error({
          message: t('department:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportDepartmentsFetcher.state]);
  //#endregion

  //#region Delete
  const deleteDepartmentFetcher = useFetcher<typeof actionDeleteDepartment>();

  const isDeleting = useMemo(() => {
    return deleteDepartmentFetcher.state === 'loading' || deleteDepartmentFetcher.state === 'submitting';
  }, [deleteDepartmentFetcher]);
  const [isOpenModalDeleteDepartment, setIsOpenModalDeleteDepartment] = useState<string | false>(false);

  const handleDelete = () => {
    deleteDepartmentFetcher.submit(
      {},
      { method: 'DELETE', action: `/department/${isOpenModalDeleteDepartment}/delete` },
    );
  };

  useEffect(() => {
    if (deleteDepartmentFetcher.data && deleteDepartmentFetcher.state === 'idle') {
      const response = deleteDepartmentFetcher.data as ActionDeleteDepartmentResponse;
      if (response.hasError) {
        notification.error({
          message: t('department:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('department:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteDepartment(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteDepartmentFetcher.state]);
  //#endregion

  const renderList = () => {
    if (paramsInUrl.layout === 'tree') {
      return (
        <BoxFields>
          <TableForTreeLayout
            dataSource={data.info.hits}
            onDelete={data => setIsOpenModalDeleteDepartment(data)}
            onEdit={record => navigate(`/department/${record.id}/edit`)}
            onView={record => navigate(`/department/${record.id}/detail`)}
            deletable={isCanShow({ accept: [Role.Admin] })}
            editable={isCanShow({ accept: [Role.Admin] })}
            searchParams={paramsInUrl}
          />
        </BoxFields>
      );
    }
    return (
      <Table
        loading={isFetchingList}
        currentPage={data.page}
        pageSize={data.info.pagination.pageSize}
        totalRecords={data.info.pagination.totalRecords}
        dataSource={data.info.hits}
        onChange={page => handleRequest({ page })}
        onDelete={data => setIsOpenModalDeleteDepartment(data)}
        onEdit={record => navigate(`/department/${record.id}/edit`)}
        onView={record => navigate(`/department/${record.id}/detail`)}
        onViewManageDepartment={record => navigate(`/department/${record.managementUnit?.id}/detail`)}
        onViewPresentDepartment={record => navigate(`/employee/${record.unitManager?.id}/detail`)}
        deletable={isCanShow({ accept: [Role.Admin] })}
        editable={isCanShow({ accept: [Role.Admin] })}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          creatable={isCanShow({ accept: [Role.Admin] })}
          importable={isCanShow({ accept: [Role.Admin] })}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/department/create')}
          onImport={() => setIsOpenModalImport(true)}
        />
        <div className="flex items-center justify-end gap-2 mb-1">
          <div className="basis-[400px]">
            <FormSearchNFilter
              searchValue={paramsInUrl.search?.toString()}
              formFilterValues={{
                businessStatus: paramsInUrl.businessStatus,
              }}
              isSubmiting={isFetchingList}
              onFilter={values => handleRequest({ page: 1, businessStatus: values.businessStatus })}
              onResetFilter={() => handleRequest({ page: 1, businessStatus: undefined })}
              onSearch={value => handleRequest({ page: 1, search: value })}
            />
          </div>
          <div>
            <Select
              onChange={value => handleRequest({ layout: value })}
              value={paramsInUrl.layout ?? 'table'}
              size="large"
              options={[
                {
                  value: 'table',
                  label: (
                    <div className="text-center">
                      <TableOutlined />
                    </div>
                  ),
                },
                {
                  value: 'tree',
                  label: (
                    <div className="text-center">
                      <ClusterOutlined />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
        {renderList()}
      </div>
      <ModalImport
        downSampleUrl=""
        open={isOpenModalImport}
        onCancel={() => setIsOpenModalImport(false)}
        onOk={() => alert('Coming soon')}
      />
      <ModalConfirmDelete
        open={!!isOpenModalDeleteDepartment}
        onCancel={() => setIsOpenModalDeleteDepartment(false)}
        onOk={handleDelete}
        title={t('department:delete_title')}
        description={t('department:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
