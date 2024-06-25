import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Input, Radio } from 'reactjs';
import { Field } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { disableDaysFuture } from 'reactjs';
import { FormValues } from '../FormMutation';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectCity } from '~/packages/extends/Location/components/SelectVariants/SelectCity';
import { SelectDistrict } from '~/packages/extends/Location/components/SelectVariants/SelectDistrict';
import { SelectStudent } from '~/packages/specific/Student/components/SelectVariants/SelectStudent';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
}

export const StudentInformation = ({ form, disabledField, isEdit }: Props) => {
  const { t } = useTranslation(['common', 'registration_form']);

  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form;
  const formValues = watch();
  return (
    <>
      <Field label={t('registration_form:code')} error={errors.code?.message}>
        <Input disabled placeholder={t('registration_form:code')} value={formValues.code} />
      </Field>
      <Field withRequiredMark label={t('registration_form:student')} error={errors.studentId?.message}>
        <SelectStudent
          disabled={disabledField || isEdit}
          placeholder={t('registration_form:student')}
          student={formValues.studentId}
          onChange={(value, option) => {
            const organizationCodeOfUser = getSession()?.profile?.organizationCode ?? '';
            const studentCode = option?.rawData.code;
            setValue('code', `${organizationCodeOfUser}/${studentCode}`);

            setValue('studentCityId', option?.rawData.province?.id);
            setValue('studentCityName', option?.rawData.province?.name);
            setValue('studentCityCode', option?.rawData.province?.code);
            setValue('studentCurrentAddress', option?.rawData.address);
            setValue('studentDateOfBirth', option?.rawData.birthday);
            setValue('studentDistrict', option?.rawData.district?.name);
            setValue('studentEmail', option?.rawData.email);
            setValue('studentGender', option?.rawData.gender);
            setValue('studentParentPhone', option?.rawData.parentPhoneNumber);
            setValue('studentPhone', option?.rawData.phoneNumber);
            setValue('notifyResultToParent', option?.rawData.notifyParentsOfResults);
            setValue('studentName', option?.rawData.fullName);
            setValue('studentId', value);

            if (
              errors.code ||
              errors.studentName ||
              errors.studentId ||
              errors.studentCityId ||
              errors.studentCityCode ||
              errors.studentCurrentAddress ||
              errors.studentDateOfBirth ||
              errors.studentDistrict ||
              errors.studentEmail ||
              errors.studentGender ||
              errors.studentParentPhone ||
              errors.studentPhone ||
              errors.notifyResultToParent
            ) {
              trigger('code');
              trigger('studentName');
              trigger('studentCityId');
              trigger('studentCityName');
              trigger('studentCityCode');
              trigger('studentCurrentAddress');
              trigger('studentDateOfBirth');
              trigger('studentDistrict');
              trigger('studentEmail');
              trigger('studentGender');
              trigger('studentParentPhone');
              trigger('studentPhone');
              trigger('notifyResultToParent');
              trigger('studentId');
            }
          }}
        />
      </Field>
      <Field withRequiredMark label={t('registration_form:student_phone')} error={errors.studentPhone?.message}>
        <Input disabled placeholder={t('registration_form:student_phone')} value={formValues.studentPhone} />
      </Field>
      <Field withRequiredMark label={t('registration_form:student_email')} error={errors.studentEmail?.message}>
        <Input
          disabled={disabledField}
          placeholder={t('registration_form:student_email')}
          value={formValues.studentEmail}
          onChange={value => {
            setValue('studentEmail', value);
            if (errors.studentEmail) {
              trigger('studentEmail');
            }
          }}
        />
      </Field>
      <Field label={t('registration_form:date_of_birth')} error={errors.studentDateOfBirth?.message}>
        <SingleDayPicker
          disabled={disabledField}
          disabledDate={isEdit ? undefined : disableDaysFuture}
          className="!w-full"
          placeholder={t('registration_form:date_of_birth')}
          value={formValues.studentDateOfBirth ? dayjs(formValues.studentDateOfBirth) : undefined}
          onChange={value => {
            setValue('studentDateOfBirth', value?.toISOString());
            if (errors.studentDateOfBirth) {
              trigger('studentDateOfBirth');
            }
          }}
        />
      </Field>
      <Field label={t('registration_form:student_gender')} error={errors.studentGender?.message}>
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
      <div className="md:col-span-2">
        <Field
          withRequiredMark
          label={t('registration_form:current_address')}
          error={errors.studentCurrentAddress?.message}
        >
          <Input
            disabled={disabledField}
            placeholder={t('registration_form:current_address')}
            value={formValues.studentCurrentAddress ?? undefined}
            onChange={value => {
              setValue('studentCurrentAddress', value);
              if (errors.studentCurrentAddress) {
                trigger('studentCurrentAddress');
              }
            }}
          />
        </Field>
      </div>
      <Field label={t('registration_form:city')} error={errors.studentCityId?.message}>
        <SelectCity
          fieldKey="id"
          disabled={disabledField}
          city={formValues.studentCityId ?? undefined}
          onChange={(value, option) => {
            console.log(option?.rawData);
            setValue('studentCityId', value);
            setValue('studentCityCode', option?.rawData.code);
            setValue('studentCityName', option?.rawData.name);
            trigger('studentCityId');
            trigger('studentCityCode');
            trigger('studentCityName');
          }}
        />
      </Field>
      <Field label={t('registration_form:district')} error={errors.studentDistrict?.message}>
        <SelectDistrict
          disabled={disabledField}
          cityCode={formValues.studentCityCode ?? undefined}
          district={formValues.studentDistrict ?? undefined}
          onChange={value => {
            console.log(111, value);
            setValue('studentDistrict', value);
            if (errors.studentDistrict) {
              trigger('studentDistrict');
            }
          }}
        />
      </Field>
      <Field withRequiredMark label={t('registration_form:parent_phone')} error={errors.studentParentPhone?.message}>
        <Input
          disabled={disabledField}
          addonBefore={<div>+84</div>}
          placeholder={t('registration_form:parent_phone')}
          value={formValues.studentParentPhone ?? undefined}
          onChange={value_ => {
            const value = value_ ? takeOnlyNumber(value_) : undefined;
            setValue('studentParentPhone', value);
            if (errors.studentParentPhone) {
              trigger('studentParentPhone');
            }
          }}
        />
      </Field>
      <Field label={t('registration_form:notify_result_to_parent')} error={errors.notifyResultToParent?.message}>
        <Radio<boolean>
          items={[
            // FIXME: I18n
            { value: false, label: t('registration_form:disable_notify') },
            { value: true, label: t('registration_form:enable_notify') },
          ]}
          disabled={disabledField}
          onChange={value => {
            setValue('notifyResultToParent', value);
            if (errors.notifyResultToParent) {
              trigger('notifyResultToParent');
            }
          }}
          value={formValues.notifyResultToParent ?? false}
        />
      </Field>
    </>
  );
};
