import { Divider, Input, Select } from 'antd';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { getFormMutationResolver } from './zodResolver';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectSaleEmployees } from '~/packages/common/SelectVariants/SelectSaleEmployees';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { disablePast } from '~/utils/functions/disableDatePicker';

export interface FormValues {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const FormMutation = ({ uid, defaultValues = {}, fieldsError = {}, isSubmiting, onSubmit, disabled }: Props) => {
  const { t } = useTranslation(['common', 'appointment']);

  const disabledField = disabled || isSubmiting;

  const { handleSubmit, setError, reset } = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues: {
      ...defaultValues,
    },
    resolver: getFormMutationResolver(t as TFunction<['common', 'appointment']>),
  });

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
      reset({
        ...defaultValues,
      });
    }
  }, [defaultValues]);

  return (
    <div>
      <Form method="POST" id={uid} onSubmit={handleSubmit}>
        <BoxFields>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Field withRequiredMark label={t('appointment:student')}>
              <SelectStudent disabled={disabledField} />
            </Field>
            <Field withRequiredMark label={t('appointment:phone')}>
              <Input addonBefore={<div>+84</div>} disabled={disabledField} placeholder={t('appointment:phone')} />
            </Field>
            <Field withRequiredMark label={t('appointment:school')}>
              <Input disabled={disabledField} placeholder={t('appointment:school')} />
            </Field>
            <Field withRequiredMark label={t('appointment:source')}>
              <SelectSourceEnum disabled={disabledField} />
            </Field>
            <Field withRequiredMark label={t('appointment:sale_employees')}>
              <SelectSaleEmployees organizations={[]} disabled={disabledField} />
            </Field>
            <Field withRequiredMark label={t('appointment:department')}>
              <SelectDepartment disabled={disabledField} />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">{t('appointment:appointment')}</Divider>
            </div>
            <Field withRequiredMark label={t('appointment:status')}>
              <Select className="w-full" placeholder={t('appointment:status')} disabled={disabledField} />
            </Field>
            <Field withRequiredMark label={t('appointment:expect_inspection_department')}>
              <SelectDepartment disabled={disabledField} />
            </Field>
            <Field withRequiredMark label={t('appointment:demand')}>
              <Input disabled={disabledField} placeholder={t('appointment:demand')} />
            </Field>
            <Field withRequiredMark label={t('appointment:extra_demand')}>
              <Input disabled={disabledField} placeholder={t('appointment:extra_demand')} />
            </Field>
            <Field withRequiredMark label={t('appointment:test')}>
              <Input disabled={disabledField} placeholder={t('appointment:test')} />
            </Field>
            <Field withRequiredMark label={t('appointment:kip_test')}>
              <Input disabled={disabledField} placeholder={t('appointment:kip_test')} />
            </Field>
            <Field withRequiredMark label={t('appointment:appointment_date')}>
              <DatePicker
                disabledDate={disablePast}
                disabled={disabledField}
                placeholder={t('appointment:appointment_date')}
                className="w-full"
              />
            </Field>
            <Field withRequiredMark label={t('appointment:appointment_time')}>
              <DatePicker
                format="HH:mm"
                disabledDate={disablePast}
                disabled={disabledField}
                placeholder={t('appointment:appointment_time')}
                className="w-full"
              />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">{t('appointment:supporter')}</Divider>
            </div>
            <Field withRequiredMark label={t('appointment:admin')}>
              <SelectEmployee disabled={disabledField} />
            </Field>
            <Field withRequiredMark label={t('appointment:consultant')}>
              <SelectEmployee disabled={disabledField} />
            </Field>
            <Field withRequiredMark label={t('appointment:tutor')}>
              <SelectEmployee disabled={disabledField} />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">{t('appointment:extra_information')}</Divider>
            </div>
            <div className="md:col-span-2">
              <Field withRequiredMark label={t('appointment:note')}>
                <Input.TextArea disabled={disabledField} placeholder={t('appointment:note')} />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
