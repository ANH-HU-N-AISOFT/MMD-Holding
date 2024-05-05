import { Tabs } from 'antd';
import { TFunction } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { PersonalInformation } from './components/PersonalInformation';
import { RoleSystem } from './components/RoleSystem';
import { getFormMutationResolver } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { Department } from '~/packages/specific/Department/models/Department';
import { Employee } from '~/packages/specific/Employee/models/Employee';

export interface FormValues {
  personalInformation: {
    fullName: string;
    phone: string;
    email?: string;
    currentAddress?: string;
    city?: string;
    district?: string;
    dateOfBirth?: string;
    school?: string;
    gender?: GenderEnum;
    parentPhone?: string;
    notifyResultToParent?: boolean;
    source?: SourceEnum;
    departments: Array<Department['id']>;
    saleEmployees?: Array<Employee['employeeId']>;
  };
  roleSystem: {
    username: string;
    password: string;
    accessStatus: EmployeeAccessStatus;
  };
  // Những field lưu lại giá trị của Select, Input, ... tạm để truyền vào 1 field khác để filter, search, ...
  temporaryOptional?: {
    cityCode?: string;
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
    personalInformation: {
      notifyResultToParent: false,
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
  const { t } = useTranslation(['common', 'student']);
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
        } else if (errors.roleSystem) {
          setTabActive('roleSystem');
        }
      },
    },
    defaultValues,
    resolver: getFormMutationResolver({
      t: t as TFunction<['common', 'student']>,
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
              label: t('student:personal_information'),
              children: (
                <BoxFields>
                  <PersonalInformation form={form} disabledField={disabledField} />
                </BoxFields>
              ),
            },
            {
              key: 'roleSystem',
              label: t('student:role_system'),
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
