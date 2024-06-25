import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { isCanCreateConsultantForm } from './utils/Is';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  json,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { CourseRoadmapOrCombo } from '~/packages/specific/ConsultantForm/components/FormMutation/constants';
import { FormMutation, FormValues } from '~/packages/specific/ConsultantForm/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/ConsultantForm/components/FormMutation/zodResolver';
import { FormStatus } from '~/packages/specific/ConsultantForm/models/FormStatus';
import { createConsultantForm } from '~/packages/specific/ConsultantForm/services/createConsultantForm';
import { createUrlSearchParamsUtils } from '~/packages/specific/ConsultantForm/utils/createUrlSearchParamsUtils';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnCreatePage } from '~/utils/functions/preventRevalidateOnCreatePage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanCreateConsultantForm);
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createConsultantForm({
        consultantId: data.consultantId,
        courseComboId: data.directionalType === CourseRoadmapOrCombo.COMBO ? data.courseRoadMapOrComboId : undefined,
        courseRoadmapId:
          data.directionalType === CourseRoadmapOrCombo.COURSE_ROADMAP ? data.courseRoadMapOrComboId : undefined,
        giftIds: data.gifts ?? [],
        learningOrganizationId: data.expectDepartmentId,
        notes: data.note,
        status: data.status,
        studentId: data.studentId,
        promotionIds: data.promotionIds,
        examResults: data.examResults,
      });
      return json({
        hasError: false,
        message: 'Created',
        info: undefined,
      });
    }
    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<{ student: Student | undefined }>> => {
  await isCanAccessRoute(isCanCreateConsultantForm);
  try {
    const { studentId } = createUrlSearchParamsUtils.decrypt(request);
    if (studentId) {
      const response = await getStudent({ id: studentId });
      return json({
        student: response,
      });
    }
    return json({
      student: undefined,
    });
  } catch {
    return json({
      student: undefined,
    });
  }
};

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['consultant_form']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('consultant_form:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('consultant_form:create_success') });
        navigate('/consultant-form');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex h-full flex-col">
      <Header title={t('consultant_form:add_consultant_form')} onBack={() => navigate('/consultant-form')} />
      <div className="mb-4 flex-1">
        <FormMutation
          consultantForm={undefined}
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
          defaultValues={{
            studentId: loaderData.student?.id,
            displayStudentPhone: loaderData.student?.phoneNumber,
            displayStudentSchool: loaderData.student?.school?.id,
            displayStudentSource: loaderData.student?.source,
            displaySaleEmployees: loaderData.student?.supporterIds,
            directionalType: CourseRoadmapOrCombo.COMBO,
            status: FormStatus.Consulted,
            examResults: [],
            expectDepartmentId: getSession()?.profile?.organizationId,
          }}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/consultant-form')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnCreatePage;

export default Page;
