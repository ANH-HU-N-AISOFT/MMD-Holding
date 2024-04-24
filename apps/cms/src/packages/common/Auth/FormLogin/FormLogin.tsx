import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
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
  } = useRemixForm<FormLoginValues>({
    mode: 'onSubmit',
    defaultValues: {
      username: 'admin1',
      password: '123456',
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
          size="large"
          value={username}
          type="username"
          placeholder={t('auth:username')}
          prefix={<UserOutlined />}
          onChange={event => {
            setValue('username', event.target.value);
            trigger('username');
          }}
        />
      </Field>
      <Field label={t('auth:password')} withRequiredMark error={errors.password?.message}>
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          value={password}
          placeholder={t('auth:password')}
          onChange={event => {
            setValue('password', event.target.value);
            trigger('password');
          }}
        />
      </Field>
      <div className="mb-9 flex items-center justify-between">
        <Checkbox
          checked={remember}
          onChange={event => {
            setValue('remember', event.target.checked);
            trigger('remember');
          }}
        >
          {t('auth:remember_me')}
        </Checkbox>
        <Typography.Link className="text-sm text-primary-base">{t('auth:forgot_password')}</Typography.Link>
      </div>
      <Button type="primary" loading={isSubmitting} htmlType="submit" className="text-base block !w-full" size="large">
        {t('auth:login')}
      </Button>
    </Form>
  );
};
