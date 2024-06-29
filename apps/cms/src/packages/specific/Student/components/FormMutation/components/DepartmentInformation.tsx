import { useTranslation } from 'react-i18next';
import { Divider } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { Student } from '../../../models/Student';
import { SelectSourceEnum } from '../../SelectVariants/SelectSourceEnum';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectDepartments } from '~/packages/specific/Department/components/SelectVariants/SelectDepartments';
import { SelectEmployees } from '~/packages/specific/Employee/components/SelectVariants/SelectEmployees';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
  student: Student | undefined;
}

export const DepartmentInformation = ({ form, disabledField, student }: Props) => {
  const { t } = useTranslation(['common', 'student']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const source = watch('personalInformation.source');
  const departments = watch('personalInformation.departments')?.filter((item): item is string => Boolean(item));
  const saleEmployees = watch('personalInformation.saleEmployees');

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="md:col-span-2">
        <Divider orientation="center">
          <div className="text-base font-semibold">{t('student:branch')}</div>
        </Divider>
      </div>
      <Field label={t('student:source')} error={errors.personalInformation?.source?.message}>
        <SelectSourceEnum
          sourceEnum={source ?? undefined}
          onChange={value => {
            setValue('personalInformation.source', value);
            if (errors.personalInformation?.source) {
              trigger('personalInformation.source');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('student:department')}
        help={t('student:department_help_text')}
        error={errors.personalInformation?.departments?.message}
      >
        <SelectDepartments
          scope="currentUser"
          extraDepartments={student?.organizations ? student.organizations : []}
          departments={departments}
          onChange={value => {
            setValue('personalInformation.departments', value);
            setValue('personalInformation.saleEmployees', []);
            if (errors.personalInformation?.departments) {
              trigger('personalInformation.departments');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:sale_employees')} error={errors.personalInformation?.saleEmployees?.message}>
        <SelectEmployees
          scope="inADepartment"
          role={Role.Sale}
          organizationIds={departments}
          emptyText={t('student:must_select_department')}
          employees={saleEmployees?.filter((item): item is string => Boolean(item))}
          onChange={value => {
            setValue('personalInformation.saleEmployees', value);
            if (errors.personalInformation?.saleEmployees) {
              trigger('personalInformation.saleEmployees');
            }
          }}
          disabled={disabledField}
        />
      </Field>
    </div>
  );
};
