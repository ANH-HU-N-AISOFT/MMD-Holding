import { ClusterOutlined, TableOutlined } from '@ant-design/icons';
import { Select, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteDepartmentResponse,
  action as actionDeleteDepartment,
} from './_dashboard.department-list.$id.delete';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { ModalImport } from '~/components/Listing/ModalImport/ModalImport';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { FormSearchNFilter } from '~/packages/specific/DepartmentList/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/DepartmentList/components/Listing/Header';
import { Table } from '~/packages/specific/DepartmentList/components/Listing/Table';
import { TableForTreeLayout } from '~/packages/specific/DepartmentList/components/Listing/TableForTreeLayout';
import { BusinessStatusEnum, Department } from '~/packages/specific/DepartmentList/models/Department';
import { getDepartments } from '~/packages/specific/DepartmentList/services/getDepartments';
import { ListingSearchParams } from '~/packages/specific/DepartmentList/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/DepartmentList/utils/lisitngUrlSearchParamsUtils';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Department>>> => {
  const { page = 1, search, businessStatus, layout } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getDepartments({
      businessStatus: businessStatus as BusinessStatusEnum | undefined,
      page,
      query: search,
      perPage: layout === 'tree' ? 10000 : undefined,
    });

    return json({
      info: {
        hits: response.items,
        pagination: {
          totalPages: response.headers['x-pages-count'],
          totalRecords: response.headers['x-total-count'],
        },
      },
      page: Math.min(page, response.headers['x-pages-count'] || 1),
    });
  } catch (error) {
    console.log(error);
    return redirect('/500', { reason: '' });
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
    fetcherData.load('/department-list' + searchParamsToLoader);
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
        action: '/department-list/export' + searchParamsToLoader,
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
      { method: 'DELETE', action: `/department-list/${isOpenModalDeleteDepartment}/delete` },
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
            onEdit={record => navigate(`/department-list/${record.id}/edit`)}
            onView={record => navigate(`/department-list/${record.id}/detail`)}
          />
        </BoxFields>
      );
    }
    return (
      <Table
        loading={isFetchingList}
        currentPage={data.page}
        pageSize={10}
        totalRecords={data.info.pagination.totalRecords}
        dataSource={data.info.hits}
        onChange={page => handleRequest({ page })}
        onDelete={data => setIsOpenModalDeleteDepartment(data)}
        onEdit={record => navigate(`/department-list/${record.id}/edit`)}
        onView={record => navigate(`/department-list/${record.id}/detail`)}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/department-list/create')}
          onImport={() => setIsOpenModalImport(true)}
        />
        <div className="flex items-center justify-end gap-2 mb-1">
          <div className="basis-[400px]">
            <FormSearchNFilter
              searchValue={paramsInUrl.search?.toString()}
              formFilterValues={{}}
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

export default Page;
