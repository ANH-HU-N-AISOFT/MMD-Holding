import { Input, InputNumber, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { DateRangePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectDepartments } from '~/packages/common/SelectVariants/SelectDepartments';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
import { currencyParser } from '~/utils/functions/currency/currencyParser';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const FormMutation = ({ uid, defaultValues = {}, fieldsError = {}, isSubmiting, onSubmit, disabled }: Props) => {
  const { t } = useTranslation(['common', 'discount']);

  const disabledField = disabled || isSubmiting;

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues,
    resolver: getFormMutationResolver(t as TFunction<['common', 'discount']>),
  });
  const name = watch('name');
  const code = watch('code');
  const note = watch('note');
  const status = watch('status');
  const dateAvailable = watch('dateAvailable');
  const type = watch('type');
  const applyTo = watch('applyTo');

  useDeepCompareEffect(() => {
    Object.keys(fieldsError).forEach(key => {
      const key_ = key as keyof typeof fieldsError;
      if (fieldsError[key_]) {
        setError(key_, {
          message: fieldsError[key_],
        });
      }
    });
  }, [fieldsError]);

  useDeepCompareEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <div>
      <Form method="POST" id={uid} onSubmit={handleSubmit}>
        <BoxFields>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Field withRequiredMark label={t('discount:name')} error={errors.name?.message}>
              <Input
                value={name}
                onChange={event => {
                  setValue('name', event.target.value);
                  if (errors.name) {
                    trigger('name');
                  }
                }}
                disabled={disabledField}
                placeholder={t('discount:name')}
              />
            </Field>
            <Field withRequiredMark label={t('discount:code')} error={errors.code?.message}>
              <Input
                value={code}
                onChange={event => {
                  setValue('code', event.target.value);
                  if (errors.code) {
                    trigger('code');
                  }
                }}
                disabled={disabledField}
                placeholder={t('discount:code')}
              />
            </Field>
            <Field label={t('discount:status')} error={errors.status?.message}>
              <Input
                value={status}
                onChange={event => {
                  setValue('status', event.target.value);
                  if (errors.status) {
                    trigger('status');
                  }
                }}
                disabled={disabledField}
                placeholder={t('discount:code')}
              />
            </Field>
            <Field withRequiredMark label={t('discount:date_available')} error={errors.dateAvailable?.message}>
              <DateRangePicker
                className="w-full"
                allowClear
                value={
                  dateAvailable ? ([dayjs(dateAvailable[0]), dayjs(dateAvailable[1])] as [Dayjs, Dayjs]) : undefined
                }
                onChange={value => {
                  if (value?.[0] && value?.[1]) {
                    setValue('dateAvailable', [value?.[0].toISOString(), value?.[1].toISOString()]);
                  } else {
                    setValue('dateAvailable', undefined);
                  }
                  if (errors.dateAvailable) {
                    trigger('dateAvailable');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field label={t('discount:type')} error={errors.type?.message}>
              <Input
                value={type}
                onChange={event => {
                  setValue('type', event.target.value);
                  if (errors.type) {
                    trigger('type');
                  }
                }}
                disabled={disabledField}
                placeholder={t('discount:code')}
              />
            </Field>
            <Field label={t('discount:promotion')} error={errors.promotion?.message}>
              <InputNumber<number>
                min={0}
                suffix="%"
                disabled={disabledField}
                className="w-full"
                placeholder={t('discount:promotion')}
                formatter={value => {
                  const formatter = currencyFormatter();
                  return formatter(value) ?? '';
                }}
                parser={value => currencyParser(value) ?? 0}
                onChange={value => {
                  setValue('promotion', value ?? undefined);
                  if (errors.promotion) {
                    trigger('promotion');
                  }
                }}
              />
            </Field>
            <Field label={t('discount:apply_to')} error={errors.applyTo?.message}>
              <Radio.Group
                disabled={disabledField}
                onChange={event => {
                  setValue('applyTo', event.target.value);
                  if (errors.applyTo) {
                    trigger('applyTo');
                  }
                }}
                value={applyTo}
              >
                <Radio value="1">{t('discount:all_system')}</Radio>
                <Radio value="2">{t('discount:some_department')}</Radio>
              </Radio.Group>
            </Field>
            <Field label={t('discount:department')} error={errors.departments?.message}>
              <SelectDepartments placeholder={t('discount:department')} />
            </Field>
            <div className="md:col-span-2">
              <Field label={t('discount:note')} error={errors.note?.message}>
                <Input.TextArea
                  rows={6}
                  minLength={0}
                  maxLength={256}
                  showCount
                  value={note ?? undefined}
                  onChange={event => {
                    setValue('note', event.target.value);
                    if (errors.note) {
                      trigger('note');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('discount:note')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
