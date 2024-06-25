import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Input } from 'reactjs';
import { SingleDayPicker, disableDaysBeforeCheckpoint } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { Employee } from '../../../models/Employee';
import { JobTitleEnum } from '../../../models/JobTitleEnum';
import { SelectContractType } from '../../SelectVariants/SelectEmployeeContractType';
import { SelectEmployeeStatus } from '../../SelectVariants/SelectEmployeeStatus';
import { SelectJobTitles } from '../../SelectVariants/SelectJobTitles';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { SelectDepartment } from '~/packages/specific/Department/components/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/specific/Employee/components/SelectVariants/SelectEmployee';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  employee: Employee | undefined;
}

export const PersonnelRecord = ({ form, disabledField, employee }: Props) => {
  const { t } = useTranslation(['common', 'employee']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const code = watch('personnelRecord.code');
  const department = watch('personnelRecord.department');
  const jobTitles = watch('personnelRecord.jobTitles');
  const directionManager = watch('personnelRecord.directionManager');
  const workStatus = watch('personnelRecord.workStatus');
  const contractType = watch('personnelRecord.contractType');
  const contractStartEffectDate = watch('personnelRecord.contractStartEffectDate');
  const contractEndEffectDate = watch('personnelRecord.contractEndEffectDate');

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Field label={t('employee:code')} error={errors.personnelRecord?.code?.message}>
        <Input
          value={code ?? undefined}
          onChange={value => {
            setValue('personnelRecord.code', value);
            if (errors.personnelRecord?.code) {
              trigger('personnelRecord.code');
            }
          }}
          disabled
          // disabled={disabledField}
          placeholder={t('employee:code')}
        />
      </Field>
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
      <Field withRequiredMark label={t('employee:job_title')} error={errors.personnelRecord?.jobTitles?.message}>
        <SelectJobTitles
          jobTitles={jobTitles?.filter((item): item is JobTitleEnum => !!item)}
          onChange={value => {
            setValue('personnelRecord.jobTitles', value);
            if (errors.personnelRecord?.jobTitles) {
              trigger('personnelRecord.jobTitles');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('employee:direction_manager')} error={errors.personnelRecord?.directionManager?.message}>
        <SelectEmployee
          organizationId={department}
          emptyText={t('employee:must_select_department')}
          employee={directionManager ?? undefined}
          placeholder={t('employee:direction_manager')}
          onChange={value => {
            setValue('personnelRecord.directionManager', value);
            if (errors.personnelRecord?.directionManager) {
              trigger('personnelRecord.directionManager');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field withRequiredMark label={t('employee:work_status')} error={errors.personnelRecord?.workStatus?.message}>
        <SelectEmployeeStatus
          employeeStatus={workStatus}
          onChange={value => {
            setValue('personnelRecord.workStatus', value);
            if (errors.personnelRecord?.workStatus) {
              trigger('personnelRecord.workStatus');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('employee:employee_contract_type')} error={errors.personnelRecord?.contractType?.message}>
        <SelectContractType
          contractType={contractType ?? undefined}
          onChange={value => {
            setValue('personnelRecord.contractType', value);
            if (errors.personnelRecord?.contractType) {
              trigger('personnelRecord.contractType');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field
        label={t('employee:contract_start_effect_date')}
        error={errors.personnelRecord?.contractStartEffectDate?.message}
      >
        <SingleDayPicker
          format="DD/MM/YYYY"
          value={contractStartEffectDate ? dayjs(contractStartEffectDate) : undefined}
          onChange={value => {
            setValue('personnelRecord.contractStartEffectDate', value?.startOf('day')?.toISOString());
            setValue('personnelRecord.contractEndEffectDate', undefined);
            if (errors.personnelRecord?.contractStartEffectDate) {
              trigger('personnelRecord.contractStartEffectDate');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:contract_start_effect_date')}
          className="w-full"
        />
      </Field>
      <Field
        label={t('employee:contract_end_effect_date')}
        error={errors.personnelRecord?.contractEndEffectDate?.message}
      >
        <SingleDayPicker
          disabledDate={disableDaysBeforeCheckpoint(dayjs(contractStartEffectDate))}
          format="DD/MM/YYYY"
          value={contractEndEffectDate ? dayjs(contractEndEffectDate) : undefined}
          onChange={value => {
            setValue('personnelRecord.contractEndEffectDate', value?.endOf('day')?.toISOString());
            if (errors.personnelRecord?.contractEndEffectDate) {
              trigger('personnelRecord.contractEndEffectDate');
            }
          }}
          disabled={disabledField || !contractStartEffectDate}
          placeholder={t('employee:contract_end_effect_date')}
          className="w-full"
        />
      </Field>
    </div>
  );
};
