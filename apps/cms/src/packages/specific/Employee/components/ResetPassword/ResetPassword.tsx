import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { getFormResetPasswordResolver } from './zodResolver';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';

export interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const ResetPassword = ({ isSubmiting, uid, defaultValues, disabled, fieldsError = {}, onSubmit }: Props) => {
  const { t } = useTranslation(['common', 'employee']);

  const disabledField = disabled || isSubmiting;

  const {
    handleSubmit,
    setError,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useRemixForm<Partial<FormValues>>({
    resolver: getFormResetPasswordResolver(t),
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues: {},
  });
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

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
    <Form id={uid} onSubmit={handleSubmit}>
      <Field withRequiredMark label={t('employee:new_password')} error={errors.newPassword?.message}>
        <Input.Password
          disabled={disabledField}
          value={newPassword}
          placeholder={t('employee:new_password')}
          onChange={event => {
            setValue('newPassword', event.target.value);
            if (errors.newPassword) {
              trigger('newPassword');
            }
          }}
        />
      </Field>
      <Field withRequiredMark label={t('employee:confirm_password')} error={errors.confirmPassword?.message}>
        <Input.Password
          disabled={disabledField}
          value={confirmPassword}
          placeholder={t('employee:confirm_password')}
          onChange={event => {
            setValue('confirmPassword', event.target.value);
            if (errors.confirmPassword) {
              trigger('confirmPassword');
            }
          }}
        />
      </Field>
    </Form>
  );
};