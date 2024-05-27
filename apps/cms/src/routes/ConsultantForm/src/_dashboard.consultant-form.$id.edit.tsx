import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { Edit } from '~/packages/specific/ConsultantForm/components/Edit/Edit';
import { CourseRoadmapOrCombo } from '~/packages/specific/ConsultantForm/components/FormMutation/constants';
import { FormValues } from '~/packages/specific/ConsultantForm/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/ConsultantForm/components/FormMutation/zodResolver';
import { ConsultantForm } from '~/packages/specific/ConsultantForm/models/ConsultantForm';
import { getConsultantForm } from '~/packages/specific/ConsultantForm/services/getConsultantForm';
import { updateConsultantForm } from '~/packages/specific/ConsultantForm/services/updateConsultantForm';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant] });
  if (!params['id']) {
    return redirect('/consultant-form', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updateConsultantForm({
        id: params['id'],
        data: {
          id: params['id'],
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
          examResults: data.examResults ?? [],
        },
      });
      return json({
        hasError: false,
        message: 'Updated',
        info: undefined,
      });
    }
    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

type LoaderResponse = SimpleResponse<{ consultantForm: ConsultantForm }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant] });
  if (!params['id']) {
    return redirect('/consultant-form', {});
  }
  try {
    const response = await getConsultantForm({ id: params['id'] });
    return json({
      info: {
        consultantForm: response,
      },
      hasError: false,
      message: '',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

const FormUpdate = 'FORM_UPDATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['consultant_form']);

  const loaderData = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('consultant_form:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('consultant_form:update_success') });
        navigate('/consultant-form');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('consultant_form:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/consultant-form')}>
            {t('consultant_form:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title={t('consultant_form:consultant_form_with_name', {
          name: loaderData.info?.consultantForm.student?.fullName,
        })}
        onBack={() => navigate('/consultant-form')}
      />
      <div className="flex-1 mb-4">
        <Edit isSubmiting={isSubmiting} uid={FormUpdate} consultantForm={loaderData.info?.consultantForm} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate('/consultant-form')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
