import { Input, Radio } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { FormValues } from '../FormMutation';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectCity } from '~/packages/common/SelectVariants/SelectCity';
import { SelectDistrict } from '~/packages/common/SelectVariants/SelectDistrict';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { disableFuture } from '~/utils/functions/disableDatePicker';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
}

export const StudentInformation = ({ form, disabledField }: Props) => {
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
          // disabled={disabledField || isEdit}
          placeholder={t('registration_form:student')}
          student={formValues.studentId}
          onChange={(value, option) => {
            console.log(option?.rawData);
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
          onChange={event => {
            setValue('studentEmail', event.target.value);
            if (errors.studentEmail) {
              trigger('studentEmail');
            }
          }}
        />
      </Field>
      <Field label={t('registration_form:date_of_birth')} error={errors.studentDateOfBirth?.message}>
        <DatePicker
          disabled={disabledField}
          disabledDate={disableFuture}
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
      <Field
        withRequiredMark
        label={t('registration_form:current_address')}
        error={errors.studentCurrentAddress?.message}
      >
        <Input
          disabled={disabledField}
          placeholder={t('registration_form:current_address')}
          value={formValues.studentCurrentAddress ?? undefined}
          onChange={event => {
            setValue('studentCurrentAddress', event.target.value);
            if (errors.studentCurrentAddress) {
              trigger('studentCurrentAddress');
            }
          }}
        />
      </Field>
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
          onChange={event => {
            const value = takeOnlyNumber(event);
            setValue('studentParentPhone', value);
            if (errors.studentParentPhone) {
              trigger('studentParentPhone');
            }
          }}
        />
      </Field>
      <Field label={t('registration_form:notify_result_to_parent')} error={errors.notifyResultToParent?.message}>
        <Radio.Group
          disabled={disabledField}
          onChange={event => {
            setValue('notifyResultToParent', event.target.value);
            if (errors.notifyResultToParent) {
              trigger('notifyResultToParent');
            }
          }}
          value={formValues.notifyResultToParent}
        >
          <Radio value={false}>{t('registration_form:disable_notify')}</Radio>
          <Radio value={true}>{t('registration_form:enable_notify')}</Radio>
        </Radio.Group>
      </Field>
    </>
  );
};
