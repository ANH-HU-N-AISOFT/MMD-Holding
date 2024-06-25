import { TFunction } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'reactjs';
import { useDeepCompareEffect } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { TypeOf } from 'zod';
import { Employee } from '../../models/Employee';
import { PersonalInformation } from './components/PersonalInformation';
import { PersonnelRecord } from './components/PersonnelRecord';
import { RoleSystem } from './components/RoleSystem';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

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
  isEdit?: boolean;
  employee: Employee | undefined;
}

export const FormMutation = ({
  uid,
  defaultValues = {},
  fieldsError = {},
  isSubmiting,
  onSubmit,
  onResetPassword,
  disabled,
  hidePasswordField = false,
  needPasswordValidation = true,
  isEdit = false,
  employee,
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
      <Form
        method="POST"
        id={uid}
        onSubmit={event => {
          event.stopPropagation();
          handleSubmit(event);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        <Tabs
          tabActive={tabActive}
          onChange={setTabActive}
          tabs={[
            {
              key: 'personalInformation',
              label: t('employee:personal_information'),
              children: (
                <BoxFields>
                  <PersonalInformation isEdit={isEdit} form={form} disabledField={disabledField} />
                </BoxFields>
              ),
            },
            {
              key: 'personnelRecord',
              label: t('employee:personnel_record'),
              children: (
                <BoxFields>
                  <PersonnelRecord employee={employee} form={form} disabledField={disabledField} />
                </BoxFields>
              ),
            },
            {
              key: 'roleSystem',
              label: t('employee:role_system'),
              children: (
                <BoxFields>
                  <RoleSystem
                    employee={employee}
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
