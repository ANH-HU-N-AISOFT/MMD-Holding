import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { ActionFunctionArgs, TypedResponse, json, useActionData, useNavigate, useNavigation } from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { CourseRoadmapOrCombo } from '~/packages/specific/ConsultantForm/components/FormMutation/constants';
import { FormMutation, FormValues } from '~/packages/specific/ConsultantForm/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/ConsultantForm/components/FormMutation/zodResolver';
import { createConsultantForm } from '~/packages/specific/ConsultantForm/services/createConsultantForm';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin] });
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createConsultantForm({
        consultantId: data.consultantId,
        courseComboId: data.type === CourseRoadmapOrCombo.COMBO ? data.courseRoadMapOrComboId : undefined,
        courseRoadmapId: data.type === CourseRoadmapOrCombo.COURSE_ROADMAP ? data.courseRoadMapOrComboId : undefined,
        giftIds: [],
        learningOrganizationId: data.expectDepartmentId,
        notes: data.note,
        status: data.status,
        studentId: data.studentId,
        promotionIds: data.promotionIds,
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

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['consultant_form']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

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
    <div className="flex flex-col h-full">
      <Header title={t('consultant_form:add_consultant_form')} onBack={() => navigate('/consultant-form')} />
      <div className="flex-1 mb-4">
        <FormMutation
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
          defaultValues={{
            type: CourseRoadmapOrCombo.COMBO,
            status: FormStatus.Consulted,
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

export default Page;
