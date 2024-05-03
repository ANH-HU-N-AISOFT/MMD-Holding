import { Divider, Input } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { DeepPartial } from 'typescript-utilities';
import { FormValues } from '../FormMutation';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectRegion } from '~/packages/common/SelectVariants/SelectRegion';
import { disableFuture } from '~/utils/functions/disableDatePicker';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
}

export const PersonalInformation = ({ form, disabledField }: Props) => {
  const { t } = useTranslation(['common', 'employee']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const fullName = watch('personalInformation.fullName');
  const phone = watch('personalInformation.phone');
  const dateOfBirth = watch('personalInformation.dateOfBirth');
  const gender = watch('personalInformation.gender');
  const workEmail = watch('personalInformation.workEmail');
  const personalEmail = watch('personalInformation.personalEmail');
  const currentAddress = watch('personalInformation.currentAddress');
  const residenceAddress = watch('personalInformation.residenceAddress');
  const region = watch('personalInformation.region');
  const citizenIdCard = watch('personalInformation.citizenIdCard');
  const emergencyContactName = watch('personalInformation.emergencyContactName');
  const emergencyContactPhone = watch('personalInformation.emergencyContactPhone');
  const emergencyContactRelationship = watch('personalInformation.emergencyContactRelationship');
  const notes = watch('personalInformation.notes');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Field withRequiredMark label={t('employee:fullName')} error={errors.personalInformation?.fullName?.message}>
        <Input
          value={fullName}
          onChange={event => {
            setValue('personalInformation.fullName', event.target.value);
            if (errors.personalInformation?.fullName) {
              trigger('personalInformation.fullName');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:fullName')}
        />
      </Field>
      <Field withRequiredMark label={t('employee:phone')} error={errors.personalInformation?.phone?.message}>
        <Input
          value={phone}
          onChange={event => {
            setValue('personalInformation.phone', event.target.value);
            if (errors.personalInformation?.phone) {
              trigger('personalInformation.phone');
            }
          }}
          type="number"
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
        <DatePicker
          disabledDate={disableFuture}
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
          onChange={event => {
            setValue('personalInformation.workEmail', event.target.value);
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
          onChange={event => {
            setValue('personalInformation.personalEmail', event.target.value);
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
            value={currentAddress}
            onChange={event => {
              setValue('personalInformation.currentAddress', event.target.value);
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
            value={residenceAddress}
            onChange={event => {
              setValue('personalInformation.residenceAddress', event.target.value);
              if (errors.personalInformation?.residenceAddress) {
                trigger('personalInformation.residenceAddress');
              }
            }}
            disabled={disabledField}
            placeholder={t('employee:residence_address')}
          />
        </Field>
      </div>
      <Field label={t('employee:region')} error={errors.personalInformation?.region?.message}>
        <SelectRegion
          region={region}
          onChange={value => {
            setValue('personalInformation.region', value);
            if (errors.personalInformation?.region) {
              trigger('personalInformation.region');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('employee:citizen_id_card')} error={errors.personalInformation?.citizenIdCard?.message}>
        <Input
          value={citizenIdCard}
          onChange={event => {
            setValue('personalInformation.citizenIdCard', event.target.value);
            if (errors.personalInformation?.citizenIdCard) {
              trigger('personalInformation.citizenIdCard');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:citizen_id_card')}
        />
      </Field>
      <div className="md:col-span-2">
        <Divider orientation="center">{t('employee:emergency_contact')}</Divider>
      </div>
      <Field
        label={t('employee:emergency_contact_name')}
        error={errors.personalInformation?.emergencyContactName?.message}
      >
        <Input
          value={emergencyContactName}
          onChange={event => {
            setValue('personalInformation.emergencyContactName', event.target.value);
            if (errors.personalInformation?.emergencyContactName) {
              trigger('personalInformation.emergencyContactName');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:emergency_contact_name')}
        />
      </Field>
      <Field
        label={t('employee:emergency_contact_phone')}
        error={errors.personalInformation?.emergencyContactPhone?.message}
      >
        <Input
          value={emergencyContactPhone}
          onChange={event => {
            setValue('personalInformation.emergencyContactPhone', event.target.value);
            if (errors.personalInformation?.emergencyContactPhone) {
              trigger('personalInformation.emergencyContactPhone');
            }
          }}
          type="number"
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
          value={emergencyContactRelationship}
          onChange={event => {
            setValue('personalInformation.emergencyContactRelationship', event.target.value);
            if (errors.personalInformation?.emergencyContactRelationship) {
              trigger('personalInformation.emergencyContactRelationship');
            }
          }}
          disabled={disabledField}
          placeholder={t('employee:emergency_contact_relationship')}
        />
      </Field>
      <div className="md:col-span-2">
        <Divider orientation="center">{t('employee:additional_information')}</Divider>
      </div>
      <div className="md:col-span-2">
        <Field label={t('employee:note')} error={errors.personalInformation?.notes?.message}>
          <Input.TextArea
            value={notes}
            onChange={event => {
              setValue('personalInformation.notes', event.target.value);
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
