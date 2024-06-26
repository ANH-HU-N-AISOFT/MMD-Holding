import { useTranslation } from 'react-i18next';
import { Input, InputPassword, Typography } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { Student } from '../../../models/Student';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectRoles } from '~/packages/common/SelectVariants/Role/SelectRoles';
import { SelectSystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/SelectSystemAccessStatus';
import { SelectDepartments } from '~/packages/specific/Department/components/SelectVariants/SelectDepartments';

interface Props {
  onResetPassword?: () => void;
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  hidePasswordField: boolean;
  needPasswordValidation: boolean;
  student: Student | undefined;
}

export const RoleSystem = ({
  onResetPassword,
  form,
  disabledField,
  hidePasswordField,
  needPasswordValidation,
  student,
}: Props) => {
  const { t } = useTranslation(['common', 'student']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const departments = watch('personalInformation.departments');
  const username = watch('roleSystem.username');
  const accessStatus = watch('roleSystem.accessStatus');
  const password = watch('roleSystem.password');

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Field
        withRequiredMark
        label={t('student:department')}
        help={t('student:department_help_text')}
        error={errors.personalInformation?.departments?.message}
      >
        <SelectDepartments
          scope="currentUser"
          extraDepartments={student?.organizations ? student.organizations : []}
          departments={departments?.filter((item): item is string => Boolean(item))}
          onChange={value => {
            setValue('personalInformation.departments', value);
            if (errors.personalInformation?.departments) {
              trigger('personalInformation.departments');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field withRequiredMark label={t('student:role')} help={t('student:role_help_text')}>
        <SelectRoles disabled roles={[Role.Student]} />
      </Field>
      <Field withRequiredMark label={t('student:username')} error={errors.roleSystem?.username?.message}>
        <Input
          value={username}
          onChange={value => {
            setValue('roleSystem.username', value);
            if (errors.roleSystem?.username) {
              trigger('roleSystem.username');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:username')}
        />
      </Field>
      <Field withRequiredMark label={t('student:access_status')} error={errors.roleSystem?.accessStatus?.message}>
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
          label={t('student:password')}
          help={
            needPasswordValidation ? undefined : (
              <Typography.Link onClick={onResetPassword}>{t('student:reset_password')}</Typography.Link>
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
            placeholder={t('student:password')}
          />
        </Field>
      )}
    </div>
  );
};
