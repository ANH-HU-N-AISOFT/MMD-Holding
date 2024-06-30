import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Input, SingleDayPicker, disableDaysFuture } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { Student } from '../../../models/Student';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectCity } from '~/packages/extends/Location/components/SelectVariants/SelectCity';
import { SelectDistrict } from '~/packages/extends/Location/components/SelectVariants/SelectDistrict';
import { SelectSchool } from '~/packages/extends/Location/components/SelectVariants/SelectSchool';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
  student: Student | undefined;
}

export const StudentInformation = ({ form, disabledField }: Props) => {
  const { t } = useTranslation(['common', 'student']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const formValues = watch();

  const cityCode = watch('temporaryOptional.cityCode');

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Field
        withRequiredMark
        label={t('student:student_name')}
        error={errors.personalInformation?.studentName?.message}
      >
        <Input
          showCount
          maxLength={100}
          value={formValues.personalInformation?.studentName}
          onChange={value => {
            setValue('personalInformation.studentName', value);
            if (errors.personalInformation?.studentName) {
              trigger('personalInformation.studentName');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:student_name')}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('student:student_phone')}
        error={errors.personalInformation?.studentPhone?.message}
      >
        <Input
          value={formValues.personalInformation?.studentPhone}
          onChange={value_ => {
            const value = value_ ? takeOnlyNumber(value_) : undefined;

            if (
              !formValues.roleSystem?.username ||
              formValues.roleSystem?.username === formValues.personalInformation?.studentPhone
            ) {
              setValue('roleSystem.username', value);
            }

            setValue('personalInformation.studentPhone', value);
            if (errors.personalInformation?.studentPhone) {
              trigger('personalInformation.studentPhone');
            }
          }}
          addonBefore={<div>+84</div>}
          disabled={disabledField}
          placeholder={t('student:student_phone')}
        />
      </Field>
      <Field label={t('student:student_email')} error={errors.personalInformation?.studentEmail?.message}>
        <Input
          value={formValues.personalInformation?.studentEmail ?? undefined}
          onChange={value => {
            setValue('personalInformation.studentEmail', value);
            if (errors.personalInformation?.studentEmail) {
              trigger('personalInformation.studentEmail');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:student_email')}
        />
      </Field>
      <Field
        label={t('student:student_current_address')}
        error={errors.personalInformation?.studentCurrentAddress?.message}
      >
        <Input
          showCount
          maxLength={64}
          value={formValues.personalInformation?.studentCurrentAddress ?? undefined}
          onChange={value => {
            setValue('personalInformation.studentCurrentAddress', value);
            if (errors.personalInformation?.studentCurrentAddress) {
              trigger('personalInformation.studentCurrentAddress');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:student_current_address')}
        />
      </Field>
      <Field label={t('student:student_city')} error={errors.personalInformation?.studentCity?.message}>
        <SelectCity
          city={formValues.personalInformation?.studentCity ?? undefined}
          onChange={(value, option) => {
            setValue('personalInformation.studentCity', value);
            setValue('personalInformation.studentDistrict', undefined);
            setValue('personalInformation.studentSchool', undefined);
            setValue('temporaryOptional.cityCode', option?.rawData.code);
            if (errors.personalInformation?.studentCity) {
              trigger('personalInformation.studentCity');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:student_district')} error={errors.personalInformation?.studentDistrict?.message}>
        <SelectDistrict
          scope="inACity"
          cityCode={cityCode}
          district={formValues.personalInformation?.studentDistrict ?? undefined}
          onChange={value => {
            setValue('personalInformation.studentDistrict', value);
            if (errors.personalInformation?.studentDistrict) {
              trigger('personalInformation.studentDistrict');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:student_date_of_birth')} error={errors.personalInformation?.studentDateOfBirth?.message}>
        <SingleDayPicker
          disabledDate={disableDaysFuture}
          format="DD/MM/YYYY"
          value={
            formValues.personalInformation?.studentDateOfBirth
              ? dayjs(formValues.personalInformation?.studentDateOfBirth)
              : undefined
          }
          onChange={value => {
            setValue('personalInformation.studentDateOfBirth', value?.startOf('day')?.toISOString());
            if (errors.personalInformation?.studentDateOfBirth) {
              trigger('personalInformation.studentDateOfBirth');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:student_date_of_birth')}
          className="w-full"
        />
      </Field>
      <Field label={t('student:student_school')} error={errors.personalInformation?.studentSchool?.message}>
        <SelectSchool
          scope="inACity"
          school={formValues.personalInformation?.studentSchool ?? undefined}
          cityCode={cityCode}
          onChange={value => {
            setValue('personalInformation.studentSchool', value);
            if (errors.personalInformation?.studentSchool) {
              trigger('personalInformation.studentSchool');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:student_gender')} error={errors.personalInformation?.studentGender?.message}>
        <SelectGender
          gender={formValues.personalInformation?.studentGender ?? undefined}
          onChange={value => {
            setValue('personalInformation.studentGender', value);
            if (errors.personalInformation?.studentGender) {
              trigger('personalInformation.studentGender');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field
        label={t('student:student_citizen_id_card')}
        error={errors.personalInformation?.studentCitizenIdCard?.message}
      >
        <Input
          showCount
          maxLength={16}
          disabled={disabledField}
          placeholder={t('student:student_citizen_id_card')}
          value={formValues.personalInformation?.studentCitizenIdCard ?? undefined}
          onChange={value => {
            setValue('personalInformation.studentCitizenIdCard', value);
            if (errors.personalInformation?.studentCitizenIdCard) {
              trigger('personalInformation.studentCitizenIdCard');
            }
          }}
        />
      </Field>
      <Field
        label={t('student:student_citizen_id_card_created_at')}
        error={errors.personalInformation?.studentCitizenIdCardCreatedAt?.message}
      >
        <SingleDayPicker
          className="!w-full"
          disabled={disabledField}
          disabledDate={disableDaysFuture}
          placeholder={t('student:student_citizen_id_card_created_at')}
          value={
            formValues.personalInformation?.studentCitizenIdCardCreatedAt
              ? dayjs(formValues.personalInformation?.studentCitizenIdCardCreatedAt)
              : undefined
          }
          onChange={value => {
            setValue('personalInformation.studentCitizenIdCardCreatedAt', value?.toISOString());
            if (errors.personalInformation?.studentCitizenIdCardCreatedAt) {
              trigger('personalInformation.studentCitizenIdCardCreatedAt');
            }
          }}
        />
      </Field>
      <Field
        label={t('student:student_citizen_id_card_created_where')}
        error={errors.personalInformation?.studentCitizenIdCardCreatedWhere?.message}
      >
        <SelectCity
          disabled={disabledField}
          placeholder={t('student:student_citizen_id_card_created_where')}
          city={formValues.personalInformation?.studentCitizenIdCardCreatedWhere ?? undefined}
          onChange={value => {
            setValue('personalInformation.studentCitizenIdCardCreatedWhere', value);
            if (errors.personalInformation?.studentCitizenIdCardCreatedWhere) {
              trigger('personalInformation.studentCitizenIdCardCreatedWhere');
            }
          }}
        />
      </Field>
      <div className="md:col-span-2">
        <Field
          label={t('student:student_residence_address')}
          error={errors.personalInformation?.studentResidenceAddress?.message}
        >
          <Input
            showCount
            maxLength={64}
            disabled={disabledField}
            placeholder={t('student:student_residence_address')}
            value={formValues.personalInformation?.studentResidenceAddress ?? undefined}
            onChange={value => {
              setValue('personalInformation.studentResidenceAddress', value);
              if (errors.personalInformation?.studentResidenceAddress) {
                trigger('personalInformation.studentResidenceAddress');
              }
            }}
          />
        </Field>
      </div>
    </div>
  );
};
