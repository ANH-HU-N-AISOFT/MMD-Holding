import { Tabs } from 'antd';
import { TFunction } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { TypeOf } from 'zod';
import { PersonalInformation } from './components/PersonalInformation';
import { RoleSystem } from './components/RoleSystem';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {
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
  tabActive?: TabKey;
  setTabActive?: Dispatch<SetStateAction<TabKey>>;
}

export type TabKey = 'personalInformation' | 'roleSystem';

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
  setTabActive,
  tabActive,
}: Props) => {
  const { t } = useTranslation(['common', 'student']);
  const [tabActiveState, setTabActiveState] = useState<TabKey>('personalInformation');

  const setTabActive_ = setTabActive ?? setTabActiveState;
  const tabActive_ = tabActive ?? tabActiveState;

  const disabledField = disabled || isSubmiting;

  const form = useRemixForm<DeepPartial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: errors => {
        console.log(errors);
        if (errors.personalInformation) {
          setTabActive_('personalInformation');
        } else if (errors.roleSystem) {
          setTabActive_('roleSystem');
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
          className="AntTab__tablist--hidden"
          activeKey={tabActive_}
          onChange={value => setTabActive_(value as TabKey)}
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
