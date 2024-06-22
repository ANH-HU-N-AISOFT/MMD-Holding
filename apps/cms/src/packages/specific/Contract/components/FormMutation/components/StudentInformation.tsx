import { Input } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { FormValues } from '../FormMutation';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { disableFuture } from '~/utils/functions/disableDatePicker';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
}

export const StudentInformation = ({ form, disabledField, isEdit }: Props) => {
  const { t } = useTranslation(['common', 'contract']);

  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form;
  const formValues = watch();
  return (
    <>
      <Field label={t('contract:code')} error={errors.code?.message}>
        <Input disabled placeholder={t('contract:code')} value={formValues.code} />
      </Field>
      <Field label={t('contract:organization')} error={errors.organizationName?.message}>
        <Input disabled placeholder={t('contract:organization')} value={formValues.organizationName} />
      </Field>
      <Field withRequiredMark label={t('contract:student')} error={errors.studentId?.message}>
        <SelectStudent
          disabled={disabledField || isEdit}
          label={student => [student.fullName, student.code].join(' - ')}
          placeholder={t('contract:student')}
          student={formValues.studentId}
          onChange={(value, option) => {
            const organizationCodeOfUser = getSession()?.profile?.organizationCode ?? '';
            const studentCode = option?.rawData.code;
            setValue('code', `${organizationCodeOfUser}/${studentCode}`);

            setValue('studentCurrentAddress', option?.rawData.address);
            setValue('studentDateOfBirth', option?.rawData.birthday);
            setValue('studentGender', option?.rawData.gender);
            setValue('studentPhone', option?.rawData.phoneNumber);
            setValue('studentName', option?.rawData.fullName);
            setValue('studentId', value);

            if (
              errors.code ||
              errors.studentName ||
              errors.studentId ||
              errors.studentCurrentAddress ||
              errors.studentDateOfBirth ||
              errors.studentGender ||
              errors.studentPhone
            ) {
              trigger('code');
              trigger('studentName');
              trigger('studentCurrentAddress');
              trigger('studentDateOfBirth');
              trigger('studentGender');
              trigger('studentPhone');
              trigger('studentId');
            }
          }}
        />
      </Field>
      <Field withRequiredMark label={t('contract:student_phone')} error={errors.studentPhone?.message}>
        <Input disabled placeholder={t('contract:student_phone')} value={formValues.studentPhone} />
      </Field>
      <Field label={t('contract:student_gender')} error={errors.studentGender?.message}>
        <SelectGender
          disabled={disabledField}
          gender={formValues.studentGender ?? undefined}
          onChange={value => {
            setValue('studentGender', value);
            if (errors.studentGender) {
              trigger('studentGender');
            }
          }}
        />
      </Field>
      <Field withRequiredMark label={t('contract:student_date_of_birth')} error={errors.studentDateOfBirth?.message}>
        <DatePicker
          disabled={disabledField}
          disabledDate={isEdit ? undefined : disableFuture}
          className="!w-full"
          placeholder={t('contract:student_date_of_birth')}
          value={formValues.studentDateOfBirth ? dayjs(formValues.studentDateOfBirth) : undefined}
          onChange={value => {
            setValue('studentDateOfBirth', value?.toISOString());
            if (errors.studentDateOfBirth) {
              trigger('studentDateOfBirth');
            }
            if (errors.parentName) {
              trigger('parentName');
            }
            if (errors.parentPhone) {
              trigger('parentPhone');
            }
            if (errors.parentCurrentAddress) {
              trigger('parentCurrentAddress');
            }
          }}
        />
      </Field>
      <div className="md:col-span-2">
        <Field label={t('contract:student_citizen_id_card')} error={errors.studentCitizenIdCard?.message}>
          <Input
            disabled={disabledField}
            placeholder={t('contract:student_citizen_id_card')}
            value={formValues.studentCitizenIdCard ?? undefined}
            onChange={event => {
              setValue('studentCitizenIdCard', event.target.value);
              if (errors.studentCitizenIdCard) {
                trigger('studentCitizenIdCard');
              }
            }}
          />
        </Field>
      </div>
      <Field label={t('contract:citizen_id_card_created_at')} error={errors.studentCitizenIdCardCreatedAt?.message}>
        <DatePicker
          className="!w-full"
          disabled={disabledField}
          disabledDate={isEdit ? undefined : disableFuture}
          placeholder={t('contract:citizen_id_card_created_at')}
          value={formValues.studentCitizenIdCardCreatedAt ? dayjs(formValues.studentCitizenIdCardCreatedAt) : undefined}
          onChange={value => {
            setValue('studentCitizenIdCardCreatedAt', value?.toISOString());
            if (errors.studentCitizenIdCardCreatedAt) {
              trigger('studentCitizenIdCardCreatedAt');
            }
          }}
        />
      </Field>
      <Field
        label={t('contract:citizen_id_card_created_where')}
        error={errors.studentCitizenIdCardCreatedWhere?.message}
      >
        <Input
          disabled={disabledField}
          placeholder={t('contract:citizen_id_card_created_where')}
          value={formValues.studentCitizenIdCardCreatedWhere ?? undefined}
          onChange={event => {
            setValue('studentCitizenIdCardCreatedWhere', event.target.value);
            if (errors.studentCitizenIdCardCreatedWhere) {
              trigger('studentCitizenIdCardCreatedWhere');
            }
          }}
        />
      </Field>
      <div className="md:col-span-2">
        <Field
          withRequiredMark
          label={t('contract:student_current_address')}
          error={errors.studentCurrentAddress?.message}
        >
          <Input
            disabled={disabledField}
            placeholder={t('contract:student_current_address')}
            value={formValues.studentCurrentAddress ?? undefined}
            onChange={event => {
              setValue('studentCurrentAddress', event.target.value);
              if (errors.studentCurrentAddress) {
                trigger('studentCurrentAddress');
              }
            }}
          />
        </Field>
      </div>
    </>
  );
};