import { Input } from 'antd';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectCourseStatus } from '~/packages/common/SelectVariants/CourseStatus/SelectCourseStatus';

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
  const { t } = useTranslation(['common', 'course']);

  const disabledField = disabled || isSubmiting;

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues,
    resolver: getFormMutationResolver(t as TFunction<['common', 'course']>),
  });
  const name = watch('name');
  const status = watch('status');
  const description = watch('description');

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
        <BoxFields>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Field withRequiredMark label={t('course:name')} error={errors.name?.message}>
              <Input
                value={name}
                onChange={event => {
                  setValue('name', event.target.value);
                  if (errors.name) {
                    trigger('name');
                  }
                }}
                disabled={disabledField}
                placeholder={t('course:name')}
              />
            </Field>
            <Field withRequiredMark label={t('course:status')} error={errors.status?.message}>
              <SelectCourseStatus
                courseStatus={status ?? undefined}
                onChange={value => {
                  setValue('status', value);
                  if (errors.status) {
                    trigger('status');
                  }
                }}
                disabled={disabledField}
                placeholder={t('course:status')}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label={t('course:description')} error={errors.description?.message}>
                <Input.TextArea
                  minLength={0}
                  maxLength={256}
                  showCount
                  value={description ?? undefined}
                  onChange={event => {
                    setValue('description', event.target.value);
                    if (errors.description) {
                      trigger('description');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('course:description')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
