import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { ActionFunctionArgs, TypedResponse, json, useActionData, useNavigate, useNavigation } from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { FormMutation, FormValues } from '~/packages/specific/Employee/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Employee/components/FormMutation/zodResolver';
import { Role } from '~/packages/specific/Employee/models/Employee';
import { createEmployee } from '~/packages/specific/Employee/services/createEmployee';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin] });
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver({ t: t as TFunction<any>, needPassword: true }),
    );
    if (data) {
      await createEmployee({
        accessStatus: data.roleSystem.accessStatus,
        birthday: data.personalInformation.dateOfBirth,
        cmnd: data.personalInformation.citizenIdCard,
        contractEndDate: data.personnelRecord.contractEndEffectDate,
        contractStartDate: data.personnelRecord.contractStartEffectDate,
        contractType: data.personnelRecord.contractType,
        currentAddress: data.personalInformation.currentAddress,
        directManagerId: data.personnelRecord.directionManager,
        emergencyContactName: data.personalInformation.emergencyContactName,
        emergencyContactPhone: data.personalInformation.emergencyContactPhone,
        emergencyContactRelationship: data.personalInformation.emergencyContactRelationship,
        fullName: data.personalInformation.fullName,
        gender: data.personalInformation.gender,
        jobTitle: data.personnelRecord.jobTitle,
        nationality: data.personalInformation.region,
        notes: data.personalInformation.notes,
        organizationId: data.personnelRecord.department,
        password: data.roleSystem.password,
        permanentAddress: data.personalInformation.residenceAddress,
        personalEmail: data.personalInformation.personalEmail,
        phoneNumber: data.personalInformation.phone,
        roles: data.roleSystem.roles,
        username: data.roleSystem.username,
        workEmail: data.personalInformation.workEmail,
        workStatus: data.personnelRecord.workStatus,
      });
      return json({ hasError: false, message: 'Created' });
    }
    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const loader = () => {
  isCanAccessRoute({ accept: [Role.Admin] });
  return null;
};

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['employee']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('employee:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('employee:create_success') });
        navigate('/employee');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex flex-col h-full">
      <Header title={t('employee:add_employee')} onBack={() => navigate('/employee')} />
      <div className="flex-1">
        <FormMutation isSubmiting={isSubmiting} uid={FormCreateUid} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/employee')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
