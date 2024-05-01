import { notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteDepartmentResponse,
  action as actionDeleteDepartment,
} from './_dashboard.department.$id.delete';
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
import { Detail } from '~/packages/specific/Department/components/Detail/Detail';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartment } from '~/packages/specific/Department/services/getDepartment';
import { Role } from '~/packages/specific/Employee/models/Employee';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<{ department: Department }>> => {
  if (!params['id']) {
    return redirect('/department', {});
  }
  try {
    const response = await getDepartment({ id: params['id'] });
    return json({
      department: response,
    });
  } catch (error) {
    console.log(error);
    return redirect('/500', { reason: '' });
  }
};

export const Page = () => {
  const { t } = useTranslation(['department']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

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
        navigate('/department');
        setIsOpenModalDeleteDepartment(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteDepartmentFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('department_with_name', { name: loaderData.department.name })}
          onBack={() => navigate('/department')}
        />
        <div className="flex-1">
          <Detail department={loaderData.department} />
        </div>
        {isCanShow({ accept: [Role.Admin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteDepartment(loaderData.department.id)}
            onEdit={() => navigate(`/department/${loaderData.department.id}/edit`)}
          />
        )}
      </div>
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