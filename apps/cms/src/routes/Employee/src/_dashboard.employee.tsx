import i18next from 'i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteEmployeeResponse,
  action as actionDeleteEmployee,
} from './_dashboard.employee.$id.delete';
import {
  ActionResponse as ActionResetPasswordResponse,
  action as actionResetPassword,
} from './_dashboard.employee.$id.reset-password';
import {
  isCanCreateEmployee,
  isCanDeleteEmployee,
  isCanEditEmployee,
  isCanExportEmployee,
  isCanImportEmployee,
  isCanReadEmployee,
} from './utils/Is';
import { ModalWithI18n } from '~/components/AntCustom/ModalWithI18n';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/remix';
import { useListingData } from '~/packages/base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/base/types/SimpleListingLoaderResponse';
import { Import, ImportActions } from '~/packages/specific/Employee/components/Import/Import';
import { FormSearchNFilter } from '~/packages/specific/Employee/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Employee/components/Listing/Header';
import { Table } from '~/packages/specific/Employee/components/Listing/Table';
import { FormValues, ResetPassword } from '~/packages/specific/Employee/components/ResetPassword/ResetPassword';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';
import { ListingSearchParams } from '~/packages/specific/Employee/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Employee/utils/lisitngUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Employee>>> => {
  await isCanAccessRoute(isCanReadEmployee);
  const t = i18next.t;
  const { page = 1, search, department, roles, status } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getEmployees({
      page,
      query: search,
      organizationId: department,
      roles,
      workStatus: status,
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

const FormResetPassword = 'FormResetPassword';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['employee']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/employee' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Employee, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Import
  const importActions = useRef<ImportActions | null>(null);
  //#endregion

  //#region Export
  const exportEmployeesFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportEmployeesFetcher.state === 'loading' || exportEmployeesFetcher.state === 'submitting';
  }, [exportEmployeesFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportEmployeesFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/employee/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportEmployeesFetcher.data && exportEmployeesFetcher.state === 'idle') {
      const response = exportEmployeesFetcher.data as ActionDeleteEmployeeResponse;
      if (response.hasError) {
        notification.error({
          message: t('employee:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportEmployeesFetcher.state]);
  //#endregion

  //#region Delete
  const deleteEmployeeFetcher = useFetcher<typeof actionDeleteEmployee>();

  const isDeleting = useMemo(() => {
    return deleteEmployeeFetcher.state === 'loading' || deleteEmployeeFetcher.state === 'submitting';
  }, [deleteEmployeeFetcher]);
  const [isOpenModalDeleteEmployee, setIsOpenModalDeleteEmployee] = useState<string | false>(false);

  const handleDelete = () => {
    deleteEmployeeFetcher.submit(
      {},
      {
        method: 'DELETE',
        action: `/employee/${isOpenModalDeleteEmployee}/delete`,
      },
    );
  };

  useEffect(() => {
    if (deleteEmployeeFetcher.data && deleteEmployeeFetcher.state === 'idle') {
      const response = deleteEmployeeFetcher.data as ActionDeleteEmployeeResponse;
      if (response.hasError) {
        notification.error({
          message: t('employee:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('employee:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteEmployee(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteEmployeeFetcher.state]);
  //#endregion

  //#region Reset password
  const resetPasswordFetcher = useFetcher<typeof actionResetPassword>();

  const isReseting = useMemo(() => {
    return resetPasswordFetcher.state === 'loading' || resetPasswordFetcher.state === 'submitting';
  }, [resetPasswordFetcher]);
  const [isOpenModalResetPassword, setIsOpenModalResetPassword] = useState<Employee | false>(false);

  const handleReset = (values: FormValues) => {
    if (isOpenModalResetPassword) {
      resetPasswordFetcher.submit(fetcherFormData.encrypt(values), {
        method: 'DELETE',
        action: `/employee/${isOpenModalResetPassword.employeeId}/reset-password`,
      });
    }
  };

  useEffect(() => {
    if (resetPasswordFetcher.data && resetPasswordFetcher.state === 'idle') {
      const response = resetPasswordFetcher.data as ActionResetPasswordResponse;
      if (response.hasError) {
        notification.error({
          message: t('employee:reset_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('employee:reset_success') });
        setIsOpenModalResetPassword(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          creatable={isCanShow(isCanCreateEmployee)}
          importable={isCanShow(isCanImportEmployee)}
          exportable={isCanShow(isCanExportEmployee)}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/employee/create')}
          onImport={() => importActions.current?.open?.()}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            department: paramsInUrl.department,
            roles: paramsInUrl.roles,
            status: paramsInUrl.status,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => handleRequest({ page: 1, department: undefined, roles: undefined, status: undefined })}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow(isCanDeleteEmployee)}
          editable={isCanShow(isCanEditEmployee)}
          passwordResetable={isCanShow(isCanEditEmployee)}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteEmployee(data)}
          onResetPassword={record => setIsOpenModalResetPassword(record)}
          onEdit={record => navigate(`/employee/${record.employeeId}/edit`)}
          onView={record => navigate(`/employee/${record.employeeId}/detail`)}
          onViewDepartment={record => window.open(`/department/${record.organization?.id}/detail`)}
        />
      </div>
      <Import
        ref={importActions}
        revalidate={() => {
          handleRequest({
            department: undefined,
            page: 1,
            roles: undefined,
            search: undefined,
            status: undefined,
          });
        }}
      />
      <ModalConfirmDelete
        open={!!isOpenModalDeleteEmployee}
        onCancel={() => setIsOpenModalDeleteEmployee(false)}
        onOk={handleDelete}
        title={t('employee:delete_title')}
        description={t('employee:delete_description')}
        loading={isDeleting}
      />
      <ModalWithI18n
        title={t('employee:reset_password')}
        open={!!isOpenModalResetPassword}
        onCancel={() => setIsOpenModalResetPassword(false)}
        okButtonProps={{ htmlType: 'submit', form: FormResetPassword }}
      >
        <ResetPassword isSubmiting={isReseting} uid={FormResetPassword} onSubmit={handleReset} defaultValues={{}} />
      </ModalWithI18n>
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
