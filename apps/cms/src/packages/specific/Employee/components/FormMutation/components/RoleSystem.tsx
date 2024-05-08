import { Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeepPartial } from 'typescript-utilities';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectEmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/SelectEmployeeAccessStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectRoles } from '~/packages/common/SelectVariants/Role/SelectRoles';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';

interface Props {
  onResetPassword?: () => void;
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  hidePasswordField: boolean;
  needPasswordValidation: boolean;
}

export const RoleSystem = ({
  onResetPassword,
  form,
  disabledField,
  hidePasswordField,
  needPasswordValidation,
}: Props) => {
  const { t } = useTranslation(['common', 'employee']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const department = watch('personnelRecord.department');
  const roles = watch('roleSystem.roles');
  const username = watch('roleSystem.username');
  const accessStatus = watch('roleSystem.accessStatus');
  const password = watch('roleSystem.password');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Field
        withRequiredMark
        label={t('employee:department')}
        help={t('employee:department_help_text')}
        error={errors.personnelRecord?.department?.message}
      >
        <SelectDepartment
          fieldLabel={['name', 'code']}
          fieldValue="id"
          department={department}
          onChange={value => {
            setValue('personnelRecord.department', value);
            if (errors.personnelRecord?.department) {
              trigger('personnelRecord.department');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('employee:role')}
        help={t('employee:role_help_text')}
        error={errors.roleSystem?.roles?.message}
      >
        <SelectRoles
          ignoreRoles={[Role.Student]}
          roles={roles?.filter((role): role is Role => !!role)}
          onChange={value => {
            setValue('roleSystem.roles', value);
            if (errors.roleSystem?.roles) {
              trigger('roleSystem.roles');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field withRequiredMark label={t('employee:username')} error={errors.roleSystem?.username?.message}>
        <Input
          value={username}
          onChange={event => {
            setValue('roleSystem.username', event.target.value);
            if (errors.roleSystem?.username) {
              trigger('roleSystem.username');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:username')}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('employee:employee_access_status')}
        error={errors.roleSystem?.accessStatus?.message}
      >
        <SelectEmployeeAccessStatus
          employeeAccessStatus={accessStatus}
          onChange={value => {
            setValue('roleSystem.accessStatus', value);
            if (errors.roleSystem?.accessStatus) {
              trigger('roleSystem.accessStatus');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      {!hidePasswordField && (
        <Field
          withRequiredMark
          label={t('employee:password')}
          help={
            needPasswordValidation ? undefined : (
              <Typography.Link onClick={onResetPassword}>{t('employee:reset_password')}</Typography.Link>
            )
          }
          error={errors.roleSystem?.password?.message}
        >
          <Input.Password
            value={password}
            onChange={event => {
              setValue('roleSystem.password', event.target.value);
              if (errors.roleSystem?.password) {
                trigger('roleSystem.password');
              }
            }}
            disabled={!needPasswordValidation || disabledField}
            placeholder={t('employee:password')}
          />
        </Field>
      )}
    </div>
  );
};
