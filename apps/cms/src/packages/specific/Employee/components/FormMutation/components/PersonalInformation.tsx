import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Divider, Input, Textarea } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { disableDaysFuture } from 'reactjs';
import { DeepPartial } from 'typescript-utilities';
import { FormValues } from '../FormMutation';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectCountry } from '~/packages/specific/Location/components/SelectVariants/SelectCountry';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
}

export const PersonalInformation = ({ form, disabledField, isEdit }: Props) => {
  const { t } = useTranslation(['common', 'employee']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const fullName = watch('personalInformation.fullName');
  const phone = watch('personalInformation.phone');
  const username = watch('roleSystem.username');
  const dateOfBirth = watch('personalInformation.dateOfBirth');
  const gender = watch('personalInformation.gender');
  const workEmail = watch('personalInformation.workEmail');
  const personalEmail = watch('personalInformation.personalEmail');
  const currentAddress = watch('personalInformation.currentAddress');
  const residenceAddress = watch('personalInformation.residenceAddress');
  const country = watch('personalInformation.country');
  const citizenIdCard = watch('personalInformation.citizenIdCard');
  const emergencyContactName = watch('personalInformation.emergencyContactName');
  const emergencyContactPhone = watch('personalInformation.emergencyContactPhone');
  const emergencyContactRelationship = watch('personalInformation.emergencyContactRelationship');
  const notes = watch('personalInformation.notes');

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Field withRequiredMark label={t('employee:full_name')} error={errors.personalInformation?.fullName?.message}>
        <Input
          value={fullName}
          onChange={value => {
            setValue('personalInformation.fullName', value);
            if (errors.personalInformation?.fullName) {
              trigger('personalInformation.fullName');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:full_name')}
        />
      </Field>
      <Field withRequiredMark label={t('employee:phone')} error={errors.personalInformation?.phone?.message}>
        <Input
          value={phone}
          onChange={value_ => {
            const value = value_ ? takeOnlyNumber(value_) : undefined;
            setValue('personalInformation.phone', value);
            if (errors.personalInformation?.phone) {
              trigger('personalInformation.phone');
            }
            if (!username || username === phone) {
              setValue('roleSystem.username', value);
            }
          }}
          addonBefore={<div>+84</div>}
          disabled={disabledField}
          placeholder={t('employee:phone')}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('employee:date_of_birth')}
        error={errors.personalInformation?.dateOfBirth?.message}
      >
        <SingleDayPicker
          disabledDate={isEdit ? undefined : disableDaysFuture}
          format="DD/MM/YYYY"
          value={dateOfBirth ? dayjs(dateOfBirth) : undefined}
          onChange={value => {
            setValue('personalInformation.dateOfBirth', value?.startOf('day')?.toISOString());
            if (errors.personalInformation?.dateOfBirth) {
              trigger('personalInformation.dateOfBirth');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:date_of_birth')}
          className="w-full"
        />
      </Field>
      <Field withRequiredMark label={t('employee:gender')} error={errors.personalInformation?.gender?.message}>
        <SelectGender
          gender={gender}
          onChange={value => {
            setValue('personalInformation.gender', value);
            if (errors.personalInformation?.gender) {
              trigger('personalInformation.gender');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field withRequiredMark label={t('employee:work_email')} error={errors.personalInformation?.workEmail?.message}>
        <Input
          value={workEmail}
          onChange={value => {
            setValue('personalInformation.workEmail', value);
            if (errors.personalInformation?.workEmail) {
              trigger('personalInformation.workEmail');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:work_email')}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('employee:personal_email')}
        error={errors.personalInformation?.personalEmail?.message}
      >
        <Input
          value={personalEmail}
          onChange={value => {
            setValue('personalInformation.personalEmail', value);
            if (errors.personalInformation?.personalEmail) {
              trigger('personalInformation.personalEmail');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:personal_email')}
        />
      </Field>
      <div className="md:col-span-2">
        <Field label={t('employee:current_address')} error={errors.personalInformation?.currentAddress?.message}>
          <Input
            value={currentAddress ?? undefined}
            onChange={value => {
              setValue('personalInformation.currentAddress', value);
              if (errors.personalInformation?.currentAddress) {
                trigger('personalInformation.currentAddress');
              }
            }}
            disabled={disabledField}
            placeholder={t('employee:current_address')}
          />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label={t('employee:residence_address')} error={errors.personalInformation?.residenceAddress?.message}>
          <Input
            value={residenceAddress ?? undefined}
            onChange={value => {
              setValue('personalInformation.residenceAddress', value);
              if (errors.personalInformation?.residenceAddress) {
                trigger('personalInformation.residenceAddress');
              }
            }}
            disabled={disabledField}
            placeholder={t('employee:residence_address')}
          />
        </Field>
      </div>
      <Field label={t('employee:country')} error={errors.personalInformation?.country?.message}>
        <SelectCountry
          country={country ?? undefined}
          onChange={value => {
            setValue('personalInformation.country', value);
            if (errors.personalInformation?.country) {
              trigger('personalInformation.country');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('employee:citizen_id_card')} error={errors.personalInformation?.citizenIdCard?.message}>
        <Input
          value={citizenIdCard ?? undefined}
          onChange={value => {
            setValue('personalInformation.citizenIdCard', value);
            if (errors.personalInformation?.citizenIdCard) {
              trigger('personalInformation.citizenIdCard');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:citizen_id_card')}
        />
      </Field>
      <div className="md:col-span-2">
        <Divider orientation="center">
          <div className="text-base font-semibold">{t('employee:emergency_contact')}</div>
        </Divider>
      </div>
      <Field
        withRequiredMark
        label={t('employee:emergency_contact_name')}
        error={errors.personalInformation?.emergencyContactName?.message}
      >
        <Input
          value={emergencyContactName}
          onChange={value => {
            setValue('personalInformation.emergencyContactName', value);
            if (errors.personalInformation?.emergencyContactName) {
              trigger('personalInformation.emergencyContactName');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:emergency_contact_name')}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('employee:emergency_contact_phone')}
        error={errors.personalInformation?.emergencyContactPhone?.message}
      >
        <Input
          value={emergencyContactPhone}
          onChange={value_ => {
            const value = value_ ? takeOnlyNumber(value_) : value_;
            setValue('personalInformation.emergencyContactPhone', value);
            if (errors.personalInformation?.emergencyContactPhone) {
              trigger('personalInformation.emergencyContactPhone');
            }
          }}
          addonBefore={<div>+84</div>}
          disabled={disabledField}
          placeholder={t('employee:emergency_contact_phone')}
        />
      </Field>
      <Field
        label={t('employee:emergency_contact_relationship')}
        error={errors.personalInformation?.emergencyContactRelationship?.message}
      >
        <Input
          value={emergencyContactRelationship ?? undefined}
          onChange={value => {
            setValue('personalInformation.emergencyContactRelationship', value);
            if (errors.personalInformation?.emergencyContactRelationship) {
              trigger('personalInformation.emergencyContactRelationship');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:emergency_contact_relationship')}
        />
      </Field>
      <div className="md:col-span-2">
        <Divider orientation="center">
          <div className="text-base font-semibold">{t('employee:additional_information')}</div>
        </Divider>
      </div>
      <div className="md:col-span-2">
        <Field label={t('employee:note')} error={errors.personalInformation?.notes?.message}>
          <Textarea
            rows={6}
            showCount
            maxLength={256}
            value={notes ?? undefined}
            onChange={value => {
              setValue('personalInformation.notes', value);
              if (errors.personalInformation?.notes) {
                trigger('personalInformation.notes');
              }
            }}
            disabled={disabledField}
            placeholder={t('employee:note')}
          />
        </Field>
      </div>
    </div>
  );
};
