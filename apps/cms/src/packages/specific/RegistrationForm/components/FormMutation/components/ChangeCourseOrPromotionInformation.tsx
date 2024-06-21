import { Divider, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { FormValues } from '../FormMutation';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
import { currencyParser } from '~/utils/functions/currency/currencyParser';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
}

export const ChangeCourseOrPromotionInformation = ({ form, disabledField }: Props) => {
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
      <div className="md:col-span-2">
        <Divider orientation="center">{t('registration_form:change_course_or_promotion')}</Divider>
      </div>

      <div className="md:col-span-2">
        <Field
          label={t('registration_form:change_promotion')}
          labelWrapperClassName="!font-bold"
          fieldWrapperClassName="px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <Field
                label={t('registration_form:date_registration_change')}
                error={errors.registrationDateOfProgramChange?.message}
              >
                <DatePicker
                  className="!w-full"
                  disabled={disabledField}
                  placeholder={t('registration_form:date_registration_change')}
                  value={
                    formValues.registrationDateOfProgramChange
                      ? dayjs(formValues.registrationDateOfProgramChange)
                      : undefined
                  }
                  onChange={value => {
                    setValue('registrationDateOfProgramChange', value?.toISOString());
                    if (errors.registrationDateOfProgramChange) {
                      trigger('registrationDateOfProgramChange');
                    }
                  }}
                />
              </Field>
            </div>
            <Field label={t('registration_form:new_promotion')} error={errors.newDiscountOfProgramChange?.message}>
              <Input
                showCount
                maxLength={100}
                placeholder={t('registration_form:new_promotion')}
                disabled={disabledField}
                value={formValues.newDiscountOfProgramChange ?? undefined}
                onChange={event => {
                  setValue('newDiscountOfProgramChange', event.target.value);
                  if (errors.newDiscountOfProgramChange) {
                    trigger('newDiscountOfProgramChange');
                  }
                }}
              />
            </Field>
            <Field label={t('registration_form:new_fee_with_measure')}>
              <InputNumber<number>
                min={0}
                className="w-full"
                disabled={disabledField}
                placeholder={t('registration_form:new_fee_with_measure')}
                formatter={value => {
                  return currencyFormatter(value) ?? '';
                }}
                parser={value => currencyParser(value) ?? 0}
                value={formValues.newTuitionFeeOfProgramChange ?? undefined}
                onChange={value => {
                  setValue('newTuitionFeeOfProgramChange', value ?? undefined);
                  if (errors.newTuitionFeeOfProgramChange) {
                    trigger('newTuitionFeeOfProgramChange');
                  }
                }}
              />
            </Field>
          </div>
        </Field>
      </div>

      <div className="md:col-span-2">
        <Field
          label={t('registration_form:change_course')}
          labelWrapperClassName="!font-bold"
          fieldWrapperClassName="px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <Field
                label={t('registration_form:date_registration_change')}
                error={errors.registrationDateOfCourseChange?.message}
              >
                <DatePicker
                  className="!w-full"
                  disabled={disabledField}
                  placeholder={t('registration_form:date_registration_change')}
                  value={
                    formValues.registrationDateOfCourseChange
                      ? dayjs(formValues.registrationDateOfCourseChange)
                      : undefined
                  }
                  onChange={value => {
                    setValue('registrationDateOfCourseChange', value?.toISOString());
                    if (errors.registrationDateOfCourseChange) {
                      trigger('registrationDateOfCourseChange');
                    }
                  }}
                />
              </Field>
            </div>
            <Field label={t('registration_form:new_course')} error={errors.newDiscountOfCourseChange?.message}>
              <Input
                showCount
                maxLength={100}
                placeholder={t('registration_form:new_course')}
                disabled={disabledField}
                value={formValues.newDiscountOfCourseChange ?? undefined}
                onChange={event => {
                  setValue('newDiscountOfCourseChange', event.target.value);
                  if (errors.newDiscountOfCourseChange) {
                    trigger('newDiscountOfCourseChange');
                  }
                }}
              />
            </Field>
            <Field label={t('registration_form:new_fee_with_measure')}>
              <InputNumber<number>
                min={0}
                className="w-full"
                disabled={disabledField}
                placeholder={t('registration_form:new_fee_with_measure')}
                formatter={value => {
                  return currencyFormatter(value) ?? '';
                }}
                parser={value => currencyParser(value) ?? 0}
                value={formValues.newTuitionFeeOfCourseChange ?? undefined}
                onChange={value => {
                  setValue('newTuitionFeeOfCourseChange', value ?? undefined);
                  if (errors.newTuitionFeeOfCourseChange) {
                    trigger('newTuitionFeeOfCourseChange');
                  }
                }}
              />
            </Field>
          </div>
        </Field>
      </div>

      <div className="md:col-span-2">
        <Field
          label={t('registration_form:first_additional_course_registration')}
          labelWrapperClassName="!font-bold"
          fieldWrapperClassName="px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <Field
                label={t('registration_form:additional_course_registration_date')}
                error={errors.registrationDateOfAdditionalCourseRegistration1?.message}
              >
                <DatePicker
                  className="!w-full"
                  disabled={disabledField}
                  placeholder={t('registration_form:additional_course_registration_date')}
                  value={
                    formValues.registrationDateOfAdditionalCourseRegistration1
                      ? dayjs(formValues.registrationDateOfAdditionalCourseRegistration1)
                      : undefined
                  }
                  onChange={value => {
                    setValue('registrationDateOfAdditionalCourseRegistration1', value?.toISOString());
                    if (errors.registrationDateOfAdditionalCourseRegistration1) {
                      trigger('registrationDateOfAdditionalCourseRegistration1');
                    }
                  }}
                />
              </Field>
            </div>
            <Field
              label={t('registration_form:additional_course_registration_name')}
              error={errors.additionalCourseOfAdditionalCourseRegistration1?.message}
            >
              <Input
                showCount
                maxLength={100}
                placeholder={t('registration_form:additional_course_registration_name')}
                disabled={disabledField}
                value={formValues.additionalCourseOfAdditionalCourseRegistration1 ?? undefined}
                onChange={event => {
                  setValue('additionalCourseOfAdditionalCourseRegistration1', event.target.value);
                  if (errors.additionalCourseOfAdditionalCourseRegistration1) {
                    trigger('additionalCourseOfAdditionalCourseRegistration1');
                  }
                }}
              />
            </Field>
            <Field label={t('registration_form:additional_course_registration_fee')}>
              <InputNumber<number>
                min={0}
                className="w-full"
                disabled={disabledField}
                placeholder={t('registration_form:additional_course_registration_fee')}
                formatter={value => {
                  return currencyFormatter(value) ?? '';
                }}
                parser={value => currencyParser(value) ?? 0}
                value={formValues.additionalTuitionFeeOfAdditionalCourseRegistration1 ?? undefined}
                onChange={value => {
                  setValue('additionalTuitionFeeOfAdditionalCourseRegistration1', value ?? undefined);
                  if (errors.additionalTuitionFeeOfAdditionalCourseRegistration1) {
                    trigger('additionalTuitionFeeOfAdditionalCourseRegistration1');
                  }
                }}
              />
            </Field>
          </div>
        </Field>
      </div>

      <div className="md:col-span-2">
        <Field
          label={t('registration_form:second_additional_course_registration')}
          labelWrapperClassName="!font-bold"
          fieldWrapperClassName="px-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <Field
                label={t('registration_form:additional_course_registration_date')}
                error={errors.registrationDateOfAdditionalCourseRegistration2?.message}
              >
                <DatePicker
                  className="!w-full"
                  disabled={disabledField}
                  placeholder={t('registration_form:additional_course_registration_date')}
                  value={
                    formValues.registrationDateOfAdditionalCourseRegistration2
                      ? dayjs(formValues.registrationDateOfAdditionalCourseRegistration2)
                      : undefined
                  }
                  onChange={value => {
                    setValue('registrationDateOfAdditionalCourseRegistration2', value?.toISOString());
                    if (errors.registrationDateOfAdditionalCourseRegistration2) {
                      trigger('registrationDateOfAdditionalCourseRegistration2');
                    }
                  }}
                />
              </Field>
            </div>
            <Field
              label={t('registration_form:additional_course_registration_name')}
              error={errors.additionalCourseOfAdditionalCourseRegistration2?.message}
            >
              <Input
                showCount
                maxLength={100}
                placeholder={t('registration_form:additional_course_registration_name')}
                disabled={disabledField}
                value={formValues.additionalCourseOfAdditionalCourseRegistration2 ?? undefined}
                onChange={event => {
                  setValue('additionalCourseOfAdditionalCourseRegistration2', event.target.value);
                  if (errors.additionalCourseOfAdditionalCourseRegistration2) {
                    trigger('additionalCourseOfAdditionalCourseRegistration2');
                  }
                }}
              />
            </Field>
            <Field label={t('registration_form:additional_course_registration_fee')}>
              <InputNumber<number>
                min={0}
                className="w-full"
                disabled={disabledField}
                placeholder={t('registration_form:additional_course_registration_fee')}
                formatter={value => {
                  return currencyFormatter(value) ?? '';
                }}
                parser={value => currencyParser(value) ?? 0}
                value={formValues.additionalTuitionFeeOfAdditionalCourseRegistration2 ?? undefined}
                onChange={value => {
                  setValue('additionalTuitionFeeOfAdditionalCourseRegistration2', value ?? undefined);
                  if (errors.additionalTuitionFeeOfAdditionalCourseRegistration2) {
                    trigger('additionalTuitionFeeOfAdditionalCourseRegistration2');
                  }
                }}
              />
            </Field>
          </div>
        </Field>
      </div>
    </>
  );
};
