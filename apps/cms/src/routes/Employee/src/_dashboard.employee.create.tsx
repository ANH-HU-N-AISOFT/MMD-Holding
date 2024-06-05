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
import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { EmployeeStatus } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { VIETNAM_VALUE } from '~/packages/common/SelectVariants/SelectRegion';
import { FormMutation, FormValues } from '~/packages/specific/Employee/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Employee/components/FormMutation/zodResolver';
import { createEmployee } from '~/packages/specific/Employee/services/createEmployee';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.SuperAdmin] });
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
        cmnd: data.personalInformation.citizenIdCard ?? undefined,
        contractEndDate: data.personnelRecord.contractEndEffectDate ?? undefined,
        contractStartDate: data.personnelRecord.contractStartEffectDate ?? undefined,
        contractType: data.personnelRecord.contractType ?? undefined,
        currentAddress: data.personalInformation.currentAddress ?? undefined,
        directManagerId: data.personnelRecord.directionManager ?? undefined,
        emergencyContactName: data.personalInformation.emergencyContactName,
        emergencyContactPhone: data.personalInformation.emergencyContactPhone,
        emergencyContactRelationship: data.personalInformation.emergencyContactRelationship ?? undefined,
        fullName: data.personalInformation.fullName,
        gender: data.personalInformation.gender,
        jobTitles: data.personnelRecord.jobTitles,
        nationality: data.personalInformation.region ?? undefined,
        notes: data.personalInformation.notes ?? undefined,
        organizationId: data.personnelRecord.department,
        password: data.roleSystem.password as string,
        permanentAddress: data.personalInformation.residenceAddress ?? undefined,
        personalEmail: data.personalInformation.personalEmail,
        phoneNumber: data.personalInformation.phone,
        roles: data.roleSystem.roles,
        username: data.roleSystem.username,
        workEmail: data.personalInformation.workEmail,
        workStatus: data.personnelRecord.workStatus,
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

export const loader = () => {
  isCanAccessRoute({ accept: [Role.SuperAdmin] });
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
      <div className="flex-1 mb-4">
        <FormMutation
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
          defaultValues={{
            personalInformation: {
              region: VIETNAM_VALUE,
            },
            personnelRecord: {
              workStatus: EmployeeStatus.WORKING,
            },
            roleSystem: {
              accessStatus: EmployeeAccessStatus.GRANTED,
              password: 'Abc@123456',
            },
          }}
        />
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
