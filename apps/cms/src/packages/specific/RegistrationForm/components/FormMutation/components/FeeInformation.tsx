import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Divider, Input, InputNumber, Textarea } from 'reactjs';
import { Field } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { disableDaysPast } from 'reactjs';
import { FormValues } from '../FormMutation';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
import { currencyParser } from '~/utils/functions/currency/currencyParser';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
  isEdit: boolean;
}

export const FeeInformation = ({ form, disabledField, isEdit }: Props) => {
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
        <Divider orientation="center">
          <div className="text-base font-semibold">{t('registration_form:fee_information_paid_at_department')}</div>
        </Divider>
      </div>
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Field label={t('registration_form:benefit_deposit_with_measure')} error={errors.benefitDeposit?.message}>
            <InputNumber
              min={0}
              disabled={disabledField}
              className="!w-full"
              formatter={value => {
                return currencyFormatter(value) ?? '';
              }}
              parser={value => currencyParser(value) ?? 0}
              placeholder={t('registration_form:benefit_deposit_with_measure')}
              value={formValues.benefitDeposit ?? undefined}
              onChange={value => {
                setValue('benefitDeposit', value ?? undefined);
                if (errors.benefitDeposit) {
                  trigger('benefitDeposit');
                }
              }}
            />
          </Field>
          <Field label={t('registration_form:receipt_number')} error={errors.receiptNumber?.message}>
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:receipt_number')}
              value={formValues.receiptNumber ?? undefined}
              onChange={value => {
                setValue('receiptNumber', value);
                if (errors.receiptNumber) {
                  trigger('receiptNumber');
                }
              }}
            />
          </Field>
          <Field label={t('registration_form:volume_number')} error={errors.volumeNumber?.message}>
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:volume_number')}
              value={formValues.volumeNumber ?? undefined}
              onChange={value => {
                setValue('volumeNumber', value);
                if (errors.volumeNumber) {
                  trigger('volumeNumber');
                }
              }}
            />
          </Field>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Field
            withRequiredMark
            label={t('registration_form:first_tuition_fee_with_measure')}
            error={errors.firstTuitionFee?.message}
          >
            <InputNumber
              min={0}
              disabled={disabledField}
              className="!w-full"
              formatter={value => {
                return currencyFormatter(value) ?? '';
              }}
              parser={value => currencyParser(value) ?? 0}
              placeholder={t('registration_form:first_tuition_fee_with_measure')}
              value={formValues.firstTuitionFee}
              onChange={value => {
                setValue('firstTuitionFee', value ?? undefined);
                if (errors.firstTuitionFee) {
                  trigger('firstTuitionFee');
                }
              }}
            />
          </Field>
          <Field
            withRequiredMark
            label={t('registration_form:receipt_number')}
            error={errors.firstReceiptNumber?.message}
          >
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:receipt_number')}
              value={formValues.firstReceiptNumber ?? undefined}
              onChange={value => {
                setValue('firstReceiptNumber', value);
                if (errors.firstReceiptNumber) {
                  trigger('firstReceiptNumber');
                }
              }}
            />
          </Field>
          <Field
            withRequiredMark
            label={t('registration_form:volume_number')}
            error={errors.firstVolumeNumber?.message}
          >
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:volume_number')}
              value={formValues.firstVolumeNumber ?? undefined}
              onChange={value => {
                setValue('firstVolumeNumber', value);
                if (errors.firstVolumeNumber) {
                  trigger('firstVolumeNumber');
                }
              }}
            />
          </Field>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Field
            label={t('registration_form:second_tuition_fee_with_measure')}
            error={errors.secondTuitionFee?.message}
          >
            <InputNumber
              min={0}
              disabled={disabledField}
              className="!w-full"
              formatter={value => {
                return currencyFormatter(value) ?? '';
              }}
              parser={value => currencyParser(value) ?? 0}
              placeholder={t('registration_form:second_tuition_fee_with_measure')}
              value={formValues.secondTuitionFee ?? undefined}
              onChange={value => {
                setValue('secondTuitionFee', value ?? undefined);
                if (errors.secondTuitionFee) {
                  trigger('secondTuitionFee');
                }
              }}
            />
          </Field>
          <Field label={t('registration_form:receipt_number')} error={errors.secondReceiptNumber?.message}>
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:receipt_number')}
              value={formValues.secondReceiptNumber ?? undefined}
              onChange={value => {
                setValue('secondReceiptNumber', value);
                if (errors.secondReceiptNumber) {
                  trigger('secondReceiptNumber');
                }
              }}
            />
          </Field>
          <Field label={t('registration_form:volume_number')} error={errors.secondVolumeNumber?.message}>
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:volume_number')}
              value={formValues.secondVolumeNumber ?? undefined}
              onChange={value => {
                setValue('secondVolumeNumber', value);
                if (errors.secondVolumeNumber) {
                  trigger('secondVolumeNumber');
                }
              }}
            />
          </Field>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Field label={t('registration_form:third_tuition_fee_with_measure')} error={errors.thirdTuitionFee?.message}>
            <InputNumber
              min={0}
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:third_tuition_fee_with_measure')}
              formatter={value => {
                return currencyFormatter(value) ?? '';
              }}
              parser={value => currencyParser(value) ?? 0}
              value={formValues.thirdTuitionFee ?? undefined}
              onChange={value => {
                setValue('thirdTuitionFee', value ?? undefined);
                if (errors.thirdTuitionFee) {
                  trigger('thirdTuitionFee');
                }
              }}
            />
          </Field>
          <Field label={t('registration_form:receipt_number')} error={errors.thirdReceiptNumber?.message}>
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:receipt_number')}
              value={formValues.thirdReceiptNumber ?? undefined}
              onChange={value => {
                setValue('thirdReceiptNumber', value);
                if (errors.thirdReceiptNumber) {
                  trigger('thirdReceiptNumber');
                }
              }}
            />
          </Field>
          <Field label={t('registration_form:volume_number')} error={errors.thirdVolumeNumber?.message}>
            <Input
              disabled={disabledField}
              className="!w-full"
              placeholder={t('registration_form:volume_number')}
              value={formValues.thirdVolumeNumber ?? undefined}
              onChange={value => {
                setValue('thirdVolumeNumber', value);
                if (errors.thirdVolumeNumber) {
                  trigger('thirdVolumeNumber');
                }
              }}
            />
          </Field>
        </div>
      </div>
      <div className="md:col-span-2">
        <Field
          withRequiredMark
          label={t('registration_form:commitment_completion_date')}
          error={errors.commitmentCompletionDate?.message}
        >
          <SingleDayPicker
            disabledDate={isEdit ? undefined : disableDaysPast}
            className="!w-full"
            placeholder={t('registration_form:commitment_completion_date')}
            disabled={disabledField}
            value={formValues.commitmentCompletionDate ? dayjs(formValues.commitmentCompletionDate) : undefined}
            onChange={value => {
              setValue('commitmentCompletionDate', value?.toISOString());
            }}
          />
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label={t('registration_form:notes')} error={errors.notes?.message}>
          <Textarea
            rows={6}
            showCount
            maxLength={256}
            value={formValues.notes ?? undefined}
            onChange={value => {
              setValue('notes', value);
              if (errors.notes) {
                trigger('notes');
              }
            }}
            disabled={disabledField}
            placeholder={t('registration_form:notes')}
          />
        </Field>
      </div>
    </>
  );
};
