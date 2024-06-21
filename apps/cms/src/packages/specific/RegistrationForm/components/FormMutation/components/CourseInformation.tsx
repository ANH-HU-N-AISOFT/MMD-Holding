import { Divider, InputNumber } from 'antd';
import { sum } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { calculateSalePrice } from '../../../utils/calculateSalePrice';
import { FormValues } from '../FormMutation';
import { SelectSingle } from '~/components/AntCustom/Select';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectPaymentMethod } from '~/packages/common/SelectVariants/PaymentMethod/SelectPaymentMethod';
import { SelectCourseRoadmaps } from '~/packages/common/SelectVariants/SelectCourseRoadmaps';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
import { currencyParser } from '~/utils/functions/currency/currencyParser';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
}

export const CourseInformation = ({ form, disabledField }: Props) => {
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
        <Divider orientation="center">{t('registration_form:course_information')}</Divider>
      </div>
      <Field withRequiredMark label={t('registration_form:course')} error={errors.courses?.message}>
        <SelectCourseRoadmaps
          disabled={disabledField}
          placeholder={t('registration_form:course')}
          courseRoadmaps={formValues.courses?.map(item => item.id)}
          label={courseRoadmap => {
            // FIXME: I18n
            return `${courseRoadmap.name} (${courseRoadmap.code}) - ${courseRoadmap.numberSessions} buổi`;
          }}
          onChange={(_, options) => {
            const newCourses = options?.map(item => ({
              id: item.value.toString(),
              name: item.rawData.name,
              numberSession: item.rawData.numberSessions,
            }));
            setValue('courses', newCourses);
            setValue('totalNumberSessions', sum((newCourses ?? [])?.map(item => item.numberSession)));
            if (errors.courses) {
              trigger('courses');
            }
          }}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('registration_form:total_number_sessions_with_measure')}
        error={errors.totalNumberSessions?.message}
      >
        <InputNumber
          min={0}
          disabled={disabledField}
          className="!w-full"
          placeholder={t('registration_form:total_number_sessions_with_measure')}
          value={formValues.totalNumberSessions}
          onChange={value => {
            setValue('totalNumberSessions', value ?? undefined);
            if (errors.totalNumberSessions) {
              trigger('totalNumberSessions');
            }
          }}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('registration_form:fee_origin_with_measure')}
        error={errors.originPrice?.message}
      >
        <InputNumber<number>
          min={0}
          className="w-full"
          disabled={disabledField}
          placeholder={t('registration_form:fee_origin_with_measure')}
          formatter={value => {
            return currencyFormatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
          value={formValues.originPrice}
          onChange={value => {
            setValue('originPrice', value ?? undefined);
            setValue(
              'salePrice',
              calculateSalePrice({
                originPrice: value ?? 0,
                promotion: formValues.promotion ?? 0,
                promotionType: formValues.promotionType ?? 'percentage',
              }),
            );
            if (errors.originPrice) {
              trigger('originPrice');
            }
          }}
        />
      </Field>
      <Field
        tagName="div"
        // FIXME: Ưu đãi làm bắt buộc ??
        withRequiredMark
        label={t('registration_form:promotion')}
        error={errors.promotion?.message}
      >
        <InputNumber<number>
          min={0}
          max={formValues.promotionType === 'percentage' ? 100 : undefined}
          id="promotion"
          className="w-full"
          disabled={disabledField}
          placeholder={t('registration_form:promotion')}
          formatter={value => {
            return currencyFormatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
          addonAfter={
            <SelectSingle
              tabIndex={-1}
              style={{ width: 60 }}
              value={formValues.promotionType}
              onChange={value => {
                setValue('promotionType', value);
                setValue('promotion', 0);
                setValue(
                  'salePrice',
                  calculateSalePrice({
                    originPrice: formValues.originPrice ?? 0,
                    promotion: formValues.promotion ?? 0,
                    promotionType: formValues.promotionType ?? 'percentage',
                  }),
                );
              }}
              options={[
                { label: '%', value: 'percentage', rawData: undefined },
                { label: '₫', value: 'price', rawData: undefined },
              ]}
            />
          }
          value={formValues.promotion}
          onChange={value => {
            setValue('promotion', value ?? undefined);
            setValue(
              'salePrice',
              calculateSalePrice({
                promotion: value ?? 0,
                promotionType: formValues.promotionType ?? 'percentage',
                originPrice: formValues.originPrice ?? 0,
              }),
            );
            if (errors.promotion) {
              trigger('promotion');
            }
          }}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('registration_form:fee_after_apply_promotion_with_measure')}
        error={errors.salePrice?.message}
      >
        <InputNumber<number>
          min={0}
          className="w-full"
          disabled
          placeholder={t('registration_form:fee_after_apply_promotion_with_measure')}
          formatter={value => {
            return currencyFormatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
          value={formValues.salePrice}
        />
      </Field>
      <Field withRequiredMark label={t('registration_form:payment_method')} error={errors.paymentMethod?.message}>
        <SelectPaymentMethod
          placeholder={t('registration_form:payment_method')}
          disabled={disabledField}
          paymentMethod={formValues.paymentMethod}
          onChange={value => {
            setValue('paymentMethod', value);
            if (errors.paymentMethod) {
              trigger('paymentMethod');
            }
          }}
        />
      </Field>
    </>
  );
};
