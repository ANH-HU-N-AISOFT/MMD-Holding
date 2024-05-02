import { notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteStudentResponse,
  action as actionDeleteStudent,
} from './_dashboard.student.$id.delete';
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
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { Detail } from '~/packages/specific/Student/components/Detail/Detail';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<{ student: Student }>> => {
  if (!params['id']) {
    return redirect('/student', {});
  }
  try {
    const response = await getStudent({ id: params['id'] });
    return json({
      student: response,
    });
  } catch (error) {
    console.log(error);
    return redirect('/500', { reason: '' });
  }
};

export const Page = () => {
  const { t } = useTranslation(['student']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

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
        navigate('/student');
        setIsOpenModalDeleteStudent(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStudentFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('student:student_with_name_n_code', {
            name: loaderData.student.fullName,
            code: loaderData.student?.code,
          })}
          onBack={() => navigate('/student')}
        />
        <div className="flex-1">
          <Detail student={loaderData.student} />
        </div>
        {isCanShow({ accept: [Role.Admin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteStudent(loaderData.student.id)}
            onEdit={() => navigate(`/student/${loaderData.student.id}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteStudent}
        onCancel={() => setIsOpenModalDeleteStudent(false)}
        onOk={handleDelete}
        title={t('student:delete_title')}
        description={t('student:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
