import { DatePicker, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeepPartial } from 'typescript-utilities';
import { dayjs } from 'utilities';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectDirectionManager } from '~/packages/common/SelectVariants/SelectDirectionManager';
import { SelectEmployeeStatus } from '~/packages/common/SelectVariants/SelectEmployeeStatus';
import { SelectEmploymentContractType } from '~/packages/common/SelectVariants/SelectEmploymentContractType';
import { SelectJobTitle } from '~/packages/common/SelectVariants/SelectJobTitle';
import { disableBeforeCheckpoint } from '~/utils/functions/disableDatePicker';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
}

export const PersonnelRecord = ({ form, disabledField }: Props) => {
  const { t } = useTranslation(['common', 'employee']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const code = watch('personnelRecord.code');
  const department = watch('personnelRecord.department');
  const jobTitle = watch('personnelRecord.jobTitle');
  const directionManager = watch('personnelRecord.directionManager');
  const workStatus = watch('personnelRecord.workStatus');
  const contractType = watch('personnelRecord.contractType');
  const contractStartEffectDate = watch('personnelRecord.contractStartEffectDate');
  const contractEndEffectDate = watch('personnelRecord.contractEndEffectDate');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Field label={t('employee:code')} error={errors.personnelRecord?.code?.message}>
        <Input
          value={code}
          onChange={event => {
            setValue('personnelRecord.code', event.target.value);
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
      <Field withRequiredMark label={t('employee:job_title')} error={errors.personnelRecord?.jobTitle?.message}>
        <SelectJobTitle
          jobTitle={jobTitle}
          onChange={value => {
            setValue('personnelRecord.jobTitle', value);
            if (errors.personnelRecord?.jobTitle) {
              trigger('personnelRecord.jobTitle');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('employee:direction_manager')} error={errors.personnelRecord?.directionManager?.message}>
        <SelectDirectionManager
          directionManager={directionManager}
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
      <Field label={t('employee:employment_contract_type')} error={errors.personnelRecord?.contractType?.message}>
        <SelectEmploymentContractType
          employmentContractType={contractType}
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
        <DatePicker
          format="DD/MM/YYYY"
          value={contractStartEffectDate ? dayjs(contractStartEffectDate) : undefined}
          onChange={value => {
            setValue('personnelRecord.contractStartEffectDate', value.toISOString());
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
        <DatePicker
          disabledDate={disableBeforeCheckpoint(dayjs(contractStartEffectDate))}
          format="DD/MM/YYYY"
          value={contractEndEffectDate ? dayjs(contractEndEffectDate) : undefined}
          onChange={value => {
            setValue('personnelRecord.contractEndEffectDate', value.toISOString());
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
