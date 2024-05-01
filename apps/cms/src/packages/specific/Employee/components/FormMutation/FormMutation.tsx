import { Tabs } from 'antd';
import { TFunction } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import {
  EmployeeAccessStatus,
  EmployeeStatus,
  EmploymentContractType,
  GenderEnum,
  JobTitleEnum,
  Role,
} from '../../models/Employee';
import { PersonalInformation } from './components/PersonalInformation';
import { PersonnelRecord } from './components/PersonnelRecord';
import { RoleSystem } from './components/RoleSystem';
import { getFormMutationResolver } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { Department } from '~/packages/specific/Department/models/Department';

export interface FormValues {
  personalInformation: {
    fullName: string;
    phone: string;
    dateOfBirth: string;
    gender: GenderEnum;
    workEmail: string;
    personalEmail: string;
    currentAddress: string;
    residenceAddress: string;
    region: string;
    citizenIdCard: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelationship: string;
    notes: string;
  };
  personnelRecord: {
    code: string;
    department: Department['id'];
    jobTitle: JobTitleEnum;
    directionManager: string;
    workStatus: EmployeeStatus;
    contractType: EmploymentContractType;
    contractStartEffectDate: string;
    contractEndEffectDate: string;
  };
  roleSystem: {
    roles: Role[];
    username: string;
    password: string;
    accessStatus: EmployeeAccessStatus;
  };
}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: DeepPartial<FormValues>;
  fieldsError?: DeepPartial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
  hidePasswordField?: boolean;
  needPasswordValidation?: boolean;
  onResetPassword?: () => void;
}

export const FormMutation = ({
  uid,
  defaultValues = {
    personalInformation: {},
    personnelRecord: {
      workStatus: EmployeeStatus.WORKING,
    },
    roleSystem: {
      accessStatus: EmployeeAccessStatus.GRANTED,
    },
  },
  fieldsError = {},
  isSubmiting,
  onSubmit,
  onResetPassword,
  disabled,
  hidePasswordField = false,
  needPasswordValidation = true,
}: Props) => {
  const { t } = useTranslation(['common', 'employee']);
  const [tabActive, setTabActive] = useState('personalInformation');

  const disabledField = disabled || isSubmiting;

  const form = useRemixForm<DeepPartial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: errors => {
        console.log(errors);
        if (errors.personalInformation) {
          setTabActive('personalInformation');
        } else if (errors.personnelRecord) {
          setTabActive('personnelRecord');
        } else if (errors.roleSystem) {
          setTabActive('roleSystem');
        }
      },
    },
    defaultValues: {},
    resolver: getFormMutationResolver({
      t: t as TFunction<['common', 'employee']>,
      needPassword: hidePasswordField ? false : needPasswordValidation,
    }),
  });
  const { handleSubmit, setError, reset } = form;

  useDeepCompareEffect(() => {
    Object.keys(fieldsError).forEach(key => {
      const key_ = key as keyof typeof fieldsError;
      if (fieldsError[key_]) {
        setError(key_, {
          message: fieldsError[key_],
        });
      }
    });
  }, [fieldsError]);

  useDeepCompareEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <div>
      <Form method="POST" id={uid} onSubmit={handleSubmit}>
        <Tabs
          activeKey={tabActive}
          onChange={setTabActive}
          items={[
            {
              key: 'personalInformation',
              label: t('employee:personal_information'),
              children: (
                <BoxFields>
                  <PersonalInformation form={form} disabledField={disabledField} />
                </BoxFields>
              ),
            },
            {
              key: 'personnelRecord',
              label: t('employee:personnel_record'),
              children: (
                <BoxFields>
                  <PersonnelRecord form={form} disabledField={disabledField} />
                </BoxFields>
              ),
            },
            {
              key: 'roleSystem',
              label: t('employee:role_system'),
              children: (
                <BoxFields>
                  <RoleSystem
                    onResetPassword={onResetPassword}
                    hidePasswordField={hidePasswordField}
                    needPasswordValidation={needPasswordValidation}
                    form={form}
                    disabledField={disabledField}
                  />
                </BoxFields>
              ),
            },
          ]}
        />
      </Form>
    </div>
  );
};
