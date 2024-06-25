import dayjs, { Dayjs } from 'dayjs';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Input, InputNumber, Radio, Textarea } from 'reactjs';
import { useDeepCompareEffect } from 'reactjs';
import { RangeDayPicker } from 'reactjs';
import { disableDaysPast } from 'reactjs';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { PromotionScope } from '~/packages/common/SelectVariants/PromotionScope/constants/PromotionScope';
import { SelectPromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/SelectPromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
import { SelectPromotionType } from '~/packages/common/SelectVariants/PromotionType/SelectPromotionType';
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
  isEdit?: boolean;
}

export const FormMutation = ({
  uid,
  defaultValues = {},
  fieldsError = {},
  isSubmiting,
  onSubmit,
  disabled,
  isEdit = false,
}: Props) => {
  const { t } = useTranslation(['common', 'promotion']);

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
    resolver: getFormMutationResolver(t as TFunction<['common', 'promotion']>),
  });
  const name = watch('name');
  const code = watch('code');
  const note = watch('note');
  const status = watch('status');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const type = watch('type');
  const scope = watch('scope');
  const departments = watch('departments');
  const promotionByMoney = watch('promotionByMoney');
  const promotionByGift = watch('promotionByGift');

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
      <Form
        method="POST"
        id={uid}
        onSubmit={handleSubmit}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        <BoxFields>
          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field withRequiredMark label={t('promotion:name')} error={errors.name?.message}>
              <Input
                value={name}
                onChange={value => {
                  setValue('name', value);
                  if (errors.name) {
                    trigger('name');
                  }
                }}
                disabled={disabledField}
                placeholder={t('promotion:name')}
              />
            </Field>
            <Field withRequiredMark label={t('promotion:code')} error={errors.code?.message}>
              <Input
                value={code}
                onChange={value => {
                  setValue('code', value);
                  if (errors.code) {
                    trigger('code');
                  }
                }}
                disabled={disabledField}
                placeholder={t('promotion:code')}
              />
            </Field>
            <Field label={t('promotion:status')} error={errors.status?.message}>
              <SelectPromotionStatus
                allowClear={false}
                promotionStatus={status}
                onChange={value => {
                  setValue('status', value);
                  if (errors.status) {
                    trigger('status');
                  }
                }}
                disabled={disabledField}
                placeholder={t('promotion:status')}
              />
            </Field>
            <Field
              withRequiredMark
              label={t('promotion:date_available')}
              error={errors.startDate?.message ?? errors.endDate?.message}
            >
              <RangeDayPicker
                disabledDate={isEdit ? undefined : disableDaysPast}
                className="w-full"
                allowClear
                value={startDate && endDate ? ([dayjs(startDate), dayjs(endDate)] as [Dayjs, Dayjs]) : undefined}
                onChange={value => {
                  setValue('startDate', value?.[0].startOf('day').toISOString());
                  setValue('endDate', value?.[1].endOf('day').toISOString());
                  if (errors.startDate || errors.endDate) {
                    trigger('startDate');
                    trigger('endDate');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field label={t('promotion:type')} error={errors.type?.message}>
              <SelectPromotionType
                allowClear={false}
                promotionType={type}
                onChange={value => {
                  setValue('type', value);
                  setValue('promotionByMoney', 0);
                  setValue('promotionByGift', '');
                  if (errors.type) {
                    trigger('type');
                  }
                }}
                disabled={disabledField}
                placeholder={t('promotion:type')}
              />
            </Field>
            <Field
              label={t('promotion:promotion2')}
              error={errors.promotionByMoney?.message || errors.promotionByGift?.message}
            >
              {type === PromotionType.Gift ? (
                <Input
                  disabled={disabledField}
                  className="w-full"
                  placeholder={t('promotion:promotion2')}
                  value={promotionByGift}
                  onChange={value => {
                    setValue('promotionByGift', value);
                    if (errors.promotionByGift) {
                      trigger('promotionByGift');
                    }
                  }}
                />
              ) : (
                <InputNumber
                  controls={false}
                  min={0}
                  max={type === PromotionType.PercentageDiscount ? 100 : undefined}
                  suffix={type === PromotionType.PercentageDiscount ? '%' : 'VNĐ'}
                  disabled={disabledField}
                  className="w-full"
                  placeholder={t('promotion:promotion2')}
                  formatter={value => {
                    if (type === PromotionType.PercentageDiscount) {
                      return value?.toString() ?? '';
                    }
                    return currencyFormatter(value) ?? '';
                  }}
                  parser={value => {
                    if (type === PromotionType.PercentageDiscount) {
                      return Number(value);
                    }
                    return currencyParser(value) ?? 0;
                  }}
                  value={promotionByMoney}
                  onChange={value => {
                    setValue('promotionByMoney', value ?? undefined);
                    if (errors.promotionByMoney) {
                      trigger('promotionByMoney');
                    }
                  }}
                />
              )}
            </Field>
            <Field label={t('promotion:apply_to')} error={errors.scope?.message}>
              <Radio
                items={[
                  { value: PromotionScope.All, label: t('promotion:all_system') },
                  { value: PromotionScope.Special, label: t('promotion:some_department') },
                ]}
                disabled={disabledField}
                onChange={value => {
                  setValue('scope', value);
                  setValue('departments', []);
                  if (errors.scope) {
                    trigger('scope');
                  }
                }}
                value={scope}
              />
            </Field>
            <Field label={t('promotion:department')} error={errors.departments?.message}>
              <SelectDepartments
                // FIXME: BE cần populate
                extraDepartments={[]}
                disabled={scope === PromotionScope.All}
                departments={departments}
                onChange={value => {
                  setValue('departments', value);
                  if (errors.departments) {
                    trigger('departments');
                  }
                }}
                placeholder={t('promotion:department')}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label={t('promotion:note')} error={errors.note?.message}>
                <Textarea
                  rows={6}
                  showCount
                  maxLength={256}
                  value={note ?? undefined}
                  onChange={value => {
                    setValue('note', value);
                    if (errors.note) {
                      trigger('note');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('promotion:note')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
