import { notification } from 'antd';
import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteStudentResponse,
  action as actionDeleteStudent,
} from './_dashboard.student.$id.delete';
import {
  ActionResponse as ActionResetPasswordResponse,
  action as actionResetPassword,
} from './_dashboard.student.$id.reset-password';
import { Modal } from '~/components/AntCustom/Modal';
import { ModalImport } from '~/components/Listing/ModalImport/ModalImport';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/@base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/@base/types/SimpleListingLoaderResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { createUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/createUrlSearchParamsUtils';
import { FormSearchNFilter } from '~/packages/specific/Student/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/Student/components/Listing/Header';
import { Table } from '~/packages/specific/Student/components/Listing/Table';
import { FormValues, ResetPassword } from '~/packages/specific/Student/components/ResetPassword/ResetPassword';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudents } from '~/packages/specific/Student/services/getStudents';
import { ListingSearchParams } from '~/packages/specific/Student/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/Student/utils/lisitngUrlSearchParamsUtils';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<Student>>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] });
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
      toastMessage: handleGetMessageToToast(t, handleCatchClauseSimpleAtClient(error)),
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
  const [isOpenModalImport, setIsOpenModalImport] = useState(false);
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
      <div className="flex flex-col h-full">
        <Header
          creatable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] })}
          importable={isCanShow({ accept: [Role.SuperAdmin] })}
          exportable={isCanShow({ accept: [Role.SuperAdmin] })}
          isExporting={isExporting}
          onExport={handleExport}
          onCreate={() => navigate('/student/create')}
          onImport={() => setIsOpenModalImport(true)}
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
          deletable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] })}
          editable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] })}
          passwordResetable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] })}
          departmentViewable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] })}
          appointmentBookable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] })}
          consultantCreatable={isCanShow({ accept: [Role.SuperAdmin, Role.Consultant] })}
          trialCreatable={isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant] })}
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
      <ModalImport
        downSampleUrl=""
        open={isOpenModalImport}
        onCancel={() => setIsOpenModalImport(false)}
        onOk={() => alert('Coming soon')}
      />
      <ModalConfirmDelete
        open={!!isOpenModalDeleteStudent}
        onCancel={() => setIsOpenModalDeleteStudent(false)}
        onOk={handleDelete}
        title={t('student:delete_title')}
        description={t('student:delete_description')}
        loading={isDeleting}
      />
      <Modal
        title={t('student:reset_password')}
        open={!!isOpenModalResetPassword}
        onCancel={() => setIsOpenModalResetPassword(false)}
        okButtonProps={{ htmlType: 'submit', form: FormResetPassword }}
        destroyOnClose
      >
        <ResetPassword isSubmiting={isReseting} uid={FormResetPassword} onSubmit={handleReset} defaultValues={{}} />
      </Modal>
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
