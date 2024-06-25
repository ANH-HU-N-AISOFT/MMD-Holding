import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Divider, Input } from 'reactjs';
import { Field } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { disableDaysFuture } from 'reactjs';
import { FormValues } from '../FormMutation';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { calculateAge } from '~/utils/functions/calculateAge';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
}

export const ParentInformation = ({ form, disabledField, isEdit }: Props) => {
  const { t } = useTranslation(['common', 'contract']);

  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form;
  const formValues = watch();

  const isNotRequireParentInformation =
    !formValues.studentDateOfBirth || calculateAge(formValues.studentDateOfBirth) >= 18;

  return (
    <>
      <div className="md:col-span-2">
        <Divider>
          <div className="text-base font-semibold">{t('contract:parent_information')}</div>
        </Divider>
      </div>
      <Field
        withRequiredMark={!isNotRequireParentInformation}
        label={t('contract:parent')}
        error={errors.parentName?.message}
      >
        <Input
          placeholder={t('contract:parent')}
          disabled={disabledField}
          value={formValues.parentName ?? undefined}
          onChange={value => {
            setValue('parentName', value);
            if (errors.parentName) {
              trigger('parentName');
            }
          }}
        />
      </Field>
      <Field
        withRequiredMark={!isNotRequireParentInformation}
        label={t('contract:parent_phone')}
        error={errors.parentPhone?.message}
      >
        <Input
          placeholder={t('contract:parent_phone')}
          disabled={disabledField}
          value={formValues.parentPhone ?? undefined}
          onChange={value_ => {
            const value = value_ ? takeOnlyNumber(value_) : undefined;
            setValue('parentPhone', value);
            if (errors.parentPhone) {
              trigger('parentPhone');
            }
          }}
        />
      </Field>
      <Field label={t('contract:parent_gender')} error={errors.parentGender?.message}>
        <SelectGender
          disabled={disabledField}
          gender={formValues.parentGender ?? undefined}
          onChange={value => {
            setValue('parentGender', value);
            if (errors.parentGender) {
              trigger('parentGender');
            }
          }}
        />
      </Field>
      <Field label={t('contract:parent_date_of_birth')} error={errors.parentDateOfBirth?.message}>
        <SingleDayPicker
          disabled={disabledField}
          disabledDate={isEdit ? undefined : disableDaysFuture}
          className="!w-full"
          placeholder={t('contract:parent_date_of_birth')}
          value={formValues.parentDateOfBirth ? dayjs(formValues.parentDateOfBirth) : undefined}
          onChange={value => {
            setValue('parentDateOfBirth', value?.toISOString());
            if (errors.parentDateOfBirth) {
              trigger('parentDateOfBirth');
            }
          }}
        />
      </Field>
      <div className="md:col-span-2">
        <Field label={t('contract:parent_citizen_id_card')} error={errors.parentCitizenIdCard?.message}>
          <Input
            disabled={disabledField}
            placeholder={t('contract:parent_citizen_id_card')}
            value={formValues.parentCitizenIdCard ?? undefined}
            onChange={value => {
              setValue('parentCitizenIdCard', value);
              if (errors.parentCitizenIdCard) {
                trigger('parentCitizenIdCard');
              }
            }}
          />
        </Field>
      </div>
      <Field label={t('contract:citizen_id_card_created_at')} error={errors.parentCitizenIdCardCreatedAt?.message}>
        <SingleDayPicker
          className="!w-full"
          disabled={disabledField}
          disabledDate={isEdit ? undefined : disableDaysFuture}
          placeholder={t('contract:citizen_id_card_created_at')}
          value={formValues.parentCitizenIdCardCreatedAt ? dayjs(formValues.parentCitizenIdCardCreatedAt) : undefined}
          onChange={value => {
            setValue('parentCitizenIdCardCreatedAt', value?.toISOString());
            if (errors.parentCitizenIdCardCreatedAt) {
              trigger('parentCitizenIdCardCreatedAt');
            }
          }}
        />
      </Field>
      <Field
        label={t('contract:citizen_id_card_created_where')}
        error={errors.parentCitizenIdCardCreatedWhere?.message}
      >
        <Input
          disabled={disabledField}
          placeholder={t('contract:citizen_id_card_created_where')}
          value={formValues.parentCitizenIdCardCreatedWhere ?? undefined}
          onChange={value => {
            setValue('parentCitizenIdCardCreatedWhere', value);
            if (errors.parentCitizenIdCardCreatedWhere) {
              trigger('parentCitizenIdCardCreatedWhere');
            }
          }}
        />
      </Field>
      <div className="md:col-span-2">
        <Field
          withRequiredMark={!isNotRequireParentInformation}
          label={t('contract:parent_current_address')}
          error={errors.parentCurrentAddress?.message}
        >
          <Input
            disabled={disabledField}
            placeholder={t('contract:parent_current_address')}
            value={formValues.parentCurrentAddress ?? undefined}
            onChange={value => {
              setValue('parentCurrentAddress', value);
              if (errors.parentCurrentAddress) {
                trigger('parentCurrentAddress');
              }
            }}
          />
        </Field>
      </div>
    </>
  );
};
