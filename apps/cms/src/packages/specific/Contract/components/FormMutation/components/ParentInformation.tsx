import { Divider, Input } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { FormValues } from '../FormMutation';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { calculateAge } from '~/utils/functions/calculateAge';
import { disableFuture } from '~/utils/functions/disableDatePicker';
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
        <Divider>{t('contract:parent_information')}</Divider>
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
          onChange={event => {
            setValue('parentName', event.target.value);
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
          onChange={event => {
            const value = takeOnlyNumber(event);
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
        <DatePicker
          disabled={disabledField}
          disabledDate={isEdit ? undefined : disableFuture}
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
            onChange={event => {
              setValue('parentCitizenIdCard', event.target.value);
              if (errors.parentCitizenIdCard) {
                trigger('parentCitizenIdCard');
              }
            }}
          />
        </Field>
      </div>
      <Field label={t('contract:citizen_id_card_created_at')} error={errors.parentCitizenIdCardCreatedAt?.message}>
        <DatePicker
          className="!w-full"
          disabled={disabledField}
          disabledDate={isEdit ? undefined : disableFuture}
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
          onChange={event => {
            setValue('parentCitizenIdCardCreatedWhere', event.target.value);
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
            onChange={event => {
              setValue('parentCurrentAddress', event.target.value);
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
