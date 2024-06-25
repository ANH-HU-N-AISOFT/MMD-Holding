import i18next from 'i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteStudentResponse,
  action as actionDeleteStudent,
} from './_dashboard.student.$id.delete';
import {
  ActionResponse as ActionResetPasswordResponse,
  action as actionResetPassword,
} from './_dashboard.student.$id.reset-password';
import {
  isCanCreateStudent,
  isCanDeleteStudent,
  isCanEditStudent,
  isCanExportStudent,
  isCanImportStudent,
  isCanReadStudent,
} from './utils/Is';
import { ModalWithI18n } from '~/components/AntCustom/ModalWithI18n';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/base/types/SimpleListingLoaderResponse';
import { createUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/createUrlSearchParamsUtils';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { Import, ImportActions } from '~/packages/specific/Student/components/Import/Import';
import { FormSearchNFilter } from '~/packages/specific/Student/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Student/components/Listing/Header';
import { Table } from '~/packages/specific/Student/components/Listing/Table';
import { FormValues, ResetPassword } from '~/packages/specific/Student/components/ResetPassword/ResetPassword';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudents } from '~/packages/specific/Student/services/getStudents';
import { ListingSearchParams } from '~/packages/specific/Student/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Student/utils/lisitngUrlSearchParamsUtils';
import { isCanCreateAppointment } from '~/routes/Appointment/src/utils/Is';
import { isCanCreateConsultantForm } from '~/routes/ConsultantForm/src/utils/Is';
import { isCanReadDepartment } from '~/routes/Department/src/utils/Is';
import { isCanCreateTrialRequest } from '~/routes/TrialRequest/src/utils/Is';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Student>>> => {
  await isCanAccessRoute(isCanReadStudent);
  const t = i18next.t;
  const { page = 1, search, department } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getStudents({
      page,
      query: search,
      orgCodes: department,
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
  const { t } = useTranslation(['student']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/student' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Student, ListingSearchParams>({
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
  const exportStudentsFetcher = useFetcher();

  const isExporting = useMemo(() => {
    return exportStudentsFetcher.state === 'loading' || exportStudentsFetcher.state === 'submitting';
  }, [exportStudentsFetcher]);

  const handleExport = () => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({ ...paramsInUrl });
    exportStudentsFetcher.submit(
      {},
      {
        method: 'POST',
        action: '/student/export' + searchParamsToLoader,
      },
    );
  };

  useEffect(() => {
    if (exportStudentsFetcher.data && exportStudentsFetcher.state === 'idle') {
      const response = exportStudentsFetcher.data as ActionDeleteStudentResponse;
      if (response.hasError) {
        notification.error({
          message: t('student:export_failure'),
          description: handleGetMessageToToast(t, response),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportStudentsFetcher.state]);
  //#endregion

  //#region Delete
  const deleteStudentFetcher = useFetcher<typeof actionDeleteStudent>();

  const isDeleting = useMemo(() => {
    return deleteStudentFetcher.state === 'loading' || deleteStudentFetcher.state === 'submitting';
  }, [deleteStudentFetcher]);
  const [isOpenModalDeleteStudent, setIsOpenModalDeleteStudent] = useState<string | false>(false);

  const handleDelete = () => {
    deleteStudentFetcher.submit({}, { method: 'DELETE', action: `/student/${isOpenModalDeleteStudent}/delete` });
  };

  useEffect(() => {
    if (deleteStudentFetcher.data && deleteStudentFetcher.state === 'idle') {
      const response = deleteStudentFetcher.data as ActionDeleteStudentResponse;
      if (response.hasError) {
        notification.error({
          message: t('student:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('student:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteStudent(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStudentFetcher.state]);
  //#endregion

  //#region Reset password
  const resetPasswordFetcher = useFetcher<typeof actionResetPassword>();

  const isReseting = useMemo(() => {
    return resetPasswordFetcher.state === 'loading' || resetPasswordFetcher.state === 'submitting';
  }, [resetPasswordFetcher]);
  const [isOpenModalResetPassword, setIsOpenModalResetPassword] = useState<Student | false>(false);

  const handleReset = (values: FormValues) => {
    if (isOpenModalResetPassword) {
      resetPasswordFetcher.submit(fetcherFormData.encrypt(values), {
        method: 'DELETE',
        action: `/student/${isOpenModalResetPassword.id}/reset-password`,
      });
    }
  };

  useEffect(() => {
    if (resetPasswordFetcher.data && resetPasswordFetcher.state === 'idle') {
      const response = resetPasswordFetcher.data as ActionResetPasswordResponse;
      if (response.hasError) {
        notification.error({
          message: t('student:reset_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('student:reset_success') });
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
          creatable={isCanShow(isCanCreateStudent)}
          importable={isCanShow(isCanImportStudent)}
          exportable={isCanShow(isCanExportStudent)}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/student/create')}
          onImport={() => importActions.current?.open?.()}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            department: paramsInUrl.department,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => handleRequest({ page: 1, department: undefined })}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow(isCanDeleteStudent)}
          editable={isCanShow(isCanEditStudent)}
          passwordResetable={isCanShow(isCanEditStudent)}
          departmentViewable={isCanShow(isCanReadDepartment)}
          appointmentBookable={isCanShow(isCanCreateAppointment)}
          consultantCreatable={isCanShow(isCanCreateConsultantForm)}
          trialCreatable={isCanShow(isCanCreateTrialRequest)}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteStudent(data)}
          onResetPassword={record => setIsOpenModalResetPassword(record)}
          onEdit={record => navigate(`/student/${record.id}/edit`)}
          onView={record => navigate(`/student/${record.id}/detail`)}
          onViewDepartment={department => window.open(`/department/${department.id}/detail`)}
          onBookAppointment={record => {
            const createSearchParams = createUrlSearchParamsUtils.encrypt({ studentId: record.id });
            navigate(`/appointment/create${createSearchParams}`);
          }}
          onCreateConsultant={record => {
            const createSearchParams = createUrlSearchParamsUtils.encrypt({ studentId: record.id });
            navigate(`/consultant-form/create${createSearchParams}`);
          }}
          onCreateTrial={record => {
            const createSearchParams = createUrlSearchParamsUtils.encrypt({ studentId: record.id });
            navigate(`/trial-request/create${createSearchParams}`);
          }}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteStudent}
        onCancel={() => setIsOpenModalDeleteStudent(false)}
        onOk={handleDelete}
        title={t('student:delete_title')}
        description={t('student:delete_description')}
        loading={isDeleting}
      />
      <Import
        ref={importActions}
        revalidate={() => {
          handleRequest({
            department: undefined,
            page: 1,
            search: undefined,
          });
        }}
      />
      <ModalWithI18n
        title={t('student:reset_password')}
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
