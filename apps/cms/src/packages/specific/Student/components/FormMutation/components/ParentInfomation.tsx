import { useTranslation } from 'react-i18next';
import { Divider, Input, Radio, SingleDayPicker, disableDaysFuture } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { dayjs } from 'utilities';
import { Student } from '../../../models/Student';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectCity } from '~/packages/extends/Location/components/SelectVariants/SelectCity';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
  student: Student | undefined;
}

export const ParentInformation = ({ form, disabledField }: Props) => {
  const { t } = useTranslation(['common', 'student']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;

  const formValues = watch();

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="md:col-span-2">
        <Divider orientation="center">
          <div className="text-base font-semibold">{t('student:parent')}</div>
        </Divider>
      </div>
      <Field label={t('student:parent_name')} error={errors.personalInformation?.parentName?.message}>
        <Input
          showCount
          maxLength={100}
          value={formValues.personalInformation?.parentName ?? undefined}
          onChange={value => {
            setValue('personalInformation.parentName', value);
            if (errors.personalInformation?.parentName) {
              trigger('personalInformation.parentName');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:parent_name')}
        />
      </Field>
      <Field label={t('student:parent_phone')} error={errors.personalInformation?.parentPhone?.message}>
        <Input
          value={formValues.personalInformation?.parentPhone ?? undefined}
          addonBefore={<div>+84</div>}
          onChange={value_ => {
            const value = value_ ? takeOnlyNumber(value_) : undefined;
            setValue('personalInformation.parentPhone', value);
            if (errors.personalInformation?.parentPhone) {
              trigger('personalInformation.parentPhone');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:parent_phone')}
        />
      </Field>
      <Field label={t('student:parent_gender')} error={errors.personalInformation?.parentGender?.message}>
        <SelectGender
          gender={formValues.personalInformation?.parentGender ?? undefined}
          onChange={value => {
            setValue('personalInformation.parentGender', value);
            if (errors.personalInformation?.parentGender) {
              trigger('personalInformation.parentGender');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:parent_date_of_birth')} error={errors.personalInformation?.parentDateOfBirth?.message}>
        <SingleDayPicker
          disabledDate={disableDaysFuture}
          format="DD/MM/YYYY"
          value={
            formValues.personalInformation?.parentDateOfBirth
              ? dayjs(formValues.personalInformation?.parentDateOfBirth)
              : undefined
          }
          onChange={value => {
            setValue('personalInformation.parentDateOfBirth', value?.startOf('day')?.toISOString());
            if (errors.personalInformation?.parentDateOfBirth) {
              trigger('personalInformation.parentDateOfBirth');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:parent_date_of_birth')}
          className="w-full"
        />
      </Field>
      <Field
        label={t('student:parent_citizen_id_card')}
        error={errors.personalInformation?.parentCitizenIdCard?.message}
      >
        <Input
          showCount
          maxLength={16}
          disabled={disabledField}
          placeholder={t('student:parent_citizen_id_card')}
          value={formValues.personalInformation?.parentCitizenIdCard ?? undefined}
          onChange={value => {
            setValue('personalInformation.parentCitizenIdCard', value);
            if (errors.personalInformation?.parentCitizenIdCard) {
              trigger('personalInformation.parentCitizenIdCard');
            }
          }}
        />
      </Field>
      <Field
        label={t('student:parent_citizen_id_card_created_at')}
        error={errors.personalInformation?.parentCitizenIdCardCreatedAt?.message}
      >
        <SingleDayPicker
          className="!w-full"
          disabled={disabledField}
          disabledDate={disableDaysFuture}
          placeholder={t('student:parent_citizen_id_card_created_at')}
          value={
            formValues.personalInformation?.parentCitizenIdCardCreatedAt
              ? dayjs(formValues.personalInformation?.parentCitizenIdCardCreatedAt)
              : undefined
          }
          onChange={value => {
            setValue('personalInformation.parentCitizenIdCardCreatedAt', value?.toISOString());
            if (errors.personalInformation?.parentCitizenIdCardCreatedAt) {
              trigger('personalInformation.parentCitizenIdCardCreatedAt');
            }
          }}
        />
      </Field>
      <Field
        label={t('student:parent_citizen_id_card_created_where')}
        error={errors.personalInformation?.parentCitizenIdCardCreatedWhere?.message}
      >
        <SelectCity
          disabled={disabledField}
          placeholder={t('student:parent_citizen_id_card_created_where')}
          city={formValues.personalInformation?.parentCitizenIdCardCreatedWhere ?? undefined}
          onChange={value => {
            setValue('personalInformation.parentCitizenIdCardCreatedWhere', value);
            if (errors.personalInformation?.parentCitizenIdCardCreatedWhere) {
              trigger('personalInformation.parentCitizenIdCardCreatedWhere');
            }
          }}
        />
      </Field>
      <Field
        label={t('student:parent_residence_address')}
        error={errors.personalInformation?.parentResidenceAddress?.message}
      >
        <Input
          showCount
          maxLength={64}
          disabled={disabledField}
          placeholder={t('student:parent_residence_address')}
          value={formValues.personalInformation?.parentResidenceAddress ?? undefined}
          onChange={value => {
            setValue('personalInformation.parentResidenceAddress', value);
            if (errors.personalInformation?.parentResidenceAddress) {
              trigger('personalInformation.parentResidenceAddress');
            }
          }}
        />
      </Field>
      <Field
        label={t('student:notify_result_to_parent')}
        error={errors.personalInformation?.notifyResultToParent?.message}
      >
        <Radio<boolean>
          items={[
            { value: false, label: t('student:disable_notify') },
            { value: true, label: t('student:enable_notify') },
          ]}
          disabled={disabledField}
          onChange={value => {
            setValue('personalInformation.notifyResultToParent', value);
            if (errors.personalInformation?.notifyResultToParent) {
              trigger('personalInformation.notifyResultToParent');
            }
          }}
          value={formValues.personalInformation?.notifyResultToParent ?? undefined}
        />
      </Field>
    </div>
  );
};
