import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteEmployeeResponse,
  action as actionDeleteEmployee,
} from './_dashboard.employee.$id.delete';
import { Footer } from '~/components/Detail/Footer';
import { Header } from '~/components/Detail/Header';
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
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { Detail } from '~/packages/specific/Employee/components/Detail/Detail';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployee } from '~/packages/specific/Employee/services/getEmployee';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ employee: Employee }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Lecturer, Role.Sale] });
  if (!params['id']) {
    return redirect('/employee', {});
  }
  try {
    const response = await getEmployee({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        employee: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['employee']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteEmployeeFetcher = useFetcher<typeof actionDeleteEmployee>();

  const isDeleting = useMemo(() => {
    return deleteEmployeeFetcher.state === 'loading' || deleteEmployeeFetcher.state === 'submitting';
  }, [deleteEmployeeFetcher]);
  const [isOpenModalDeleteEmployee, setIsOpenModalDeleteEmployee] = useState<string | false>(false);

  const handleDelete = () => {
    deleteEmployeeFetcher.submit({}, { method: 'DELETE', action: `/employee/${isOpenModalDeleteEmployee}/delete` });
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
        navigate('/employee');
        setIsOpenModalDeleteEmployee(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteEmployeeFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('employee:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/employee')}>
            {t('employee:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('employee:employee_with_name_n_code', {
            name: loaderData.info?.employee.fullName,
            code: loaderData.info?.employee.employee?.code,
          })}
          onBack={() => navigate('/employee')}
        />
        <div className="flex-1 mb-4">
          <Detail employee={loaderData.info?.employee} />
        </div>
        {isCanShow({ accept: [Role.SuperAdmin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteEmployee(loaderData.info?.employee.employeeId ?? false)}
            onEdit={() => navigate(`/employee/${loaderData.info?.employee.employeeId}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteEmployee}
        onCancel={() => setIsOpenModalDeleteEmployee(false)}
        onOk={handleDelete}
        title={t('employee:delete_title')}
        description={t('employee:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
