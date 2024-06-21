import { Tabs } from 'antd';
import { TFunction } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { Consultant } from './components/Consultant';
import { TestResult } from './components/TestResult';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const FormMutation = ({ uid, defaultValues = {}, fieldsError = {}, isSubmiting, onSubmit, disabled }: Props) => {
  const { t } = useTranslation(['common', 'consultant_form']);

  const [tabActive, setTabActive] = useState('consultant');

  const disabledField = disabled || isSubmiting;

  const form = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: errors => {
        if (errors.examResults) {
          setTabActive('testResult');
        }
        setTabActive('consultant');
      },
    },
    defaultValues,
    resolver: getFormMutationResolver(t as TFunction<['common', 'consultant_form']>),
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
        onSubmit={handleSubmit}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        <Tabs
          activeKey={tabActive}
          onChange={setTabActive}
          items={[
            {
              key: 'consultant',
              label: t('consultant_form:consultant'),
              children: (
                <BoxFields>
                  <Consultant form={form} disabledField={disabledField} />
                </BoxFields>
              ),
            },
            {
              key: 'testResult',
              label: t('consultant_form:test_result'),
              children: (
                <BoxFields>
                  <TestResult form={form} disabledField={disabledField} />
                </BoxFields>
              ),
            },
          ]}
        />
      </Form>
    </div>
  );
};
