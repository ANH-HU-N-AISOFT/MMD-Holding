import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Input, InputPassword, Typography } from 'reactjs';
import { Field } from 'reactjs';
import { getFormLoginZodSchema } from './constants/zod';
import { FormLoginProps } from './types/Props';
import { FormLoginValues } from './types/Values';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';

export const FormLogin = ({ isSubmitting }: FormLoginProps) => {
  const { t } = useTranslation(['common', 'auth']);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useRemixForm<Partial<FormLoginValues>>({
    mode: 'onSubmit',
    defaultValues: {
      remember: true,
    },
    submitHandlers: {
      onInvalid: console.log,
    },
    resolver: zodResolver(getFormLoginZodSchema(t)),
  });

  const username = watch('username');
  const password = watch('password');
  const remember = watch('remember');

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <Field label={t('auth:username')} withRequiredMark error={errors.username?.message}>
        <Input
          value={username}
          placeholder={t('auth:username')}
          prefix={<UserOutlined />}
          onChange={value => {
            setValue('username', value);
            trigger('username');
          }}
        />
      </Field>
      <Field label={t('auth:password')} withRequiredMark error={errors.password?.message}>
        <InputPassword
          prefix={<LockOutlined />}
          value={password}
          placeholder={t('auth:password')}
          onChange={value => {
            setValue('password', value);
            trigger('password');
          }}
        />
      </Field>
      <div className="mb-9 flex items-center justify-between">
        <Checkbox
          checked={remember}
          onChange={checked => {
            setValue('remember', checked);
            trigger('remember');
          }}
        >
          {t('auth:remember_me')}
        </Checkbox>
        <Typography.Link className="text-primary-base text-sm">{t('auth:forgot_password')}</Typography.Link>
      </div>
      <Button color="primary" loading={isSubmitting} htmlType="submit" className="text-base" block>
        {t('auth:login')}
      </Button>
    </Form>
  );
};
