import { useTranslation } from 'react-i18next';
import { Input, InputPassword, Typography } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { Employee } from '../../../models/Employee';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectRoles } from '~/packages/common/SelectVariants/Role/SelectRoles';
import { SelectSystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/SelectSystemAccessStatus';
import { SelectDepartment } from '~/packages/specific/Department/components/SelectVariants/SelectDepartment';

interface Props {
  onResetPassword?: () => void;
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  hidePasswordField: boolean;
  needPasswordValidation: boolean;
  employee: Employee | undefined;
}

export const RoleSystem = ({
  onResetPassword,
  form,
  disabledField,
  hidePasswordField,
  needPasswordValidation,
  employee,
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
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Field
        withRequiredMark
        label={t('employee:department')}
        help={t('employee:department_help_text')}
        error={errors.personnelRecord?.department?.message}
      >
        <SelectDepartment
          extraDepartments={
            employee?.organization
              ? [
                  {
                    code: employee?.organization.code,
                    id: employee?.organization.id,
                    name: employee?.organization.fullName,
                  },
                ]
              : []
          }
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
          roles={roles?.filter((role): role is Exclude<Role, Role.SuperAdmin> => !!role)}
          onChange={value => {
            setValue(
              'roleSystem.roles',
              value?.filter((role): role is Exclude<Role, Role.SuperAdmin> => role !== Role.Admin),
            );
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
          onChange={value => {
            setValue('roleSystem.username', value);
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
        <SelectSystemAccessStatus
          systemAccessStatus={accessStatus}
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
          <InputPassword
            value={password ?? undefined}
            onChange={value => {
              setValue('roleSystem.password', value);
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
