import { Input, InputNumber } from 'antd';
import { TFunction } from 'i18next';
import { sum } from 'ramda';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { getDisplaySessionDuration } from '../../utils/getDisplaySessionDuration';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectCourseStatus } from '~/packages/common/SelectVariants/CourseStatus/SelectCourseStatus';
import { SelectCourseRoadmaps } from '~/packages/common/SelectVariants/SelectCourseRoadmaps';
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
  const { t } = useTranslation(['common', 'course_combo']);

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
    resolver: getFormMutationResolver(t as TFunction<['common', 'course_combo']>),
  });
  const name = watch('name');
  const courseRoadmapIds = watch('courseRoadmapIds');
  const totalNumberSessions = watch('totalNumberSessions');
  const displayTotalSessionDuration = watch('displayTotalSessionDuration');
  const totalPrice = watch('totalPrice');
  const status = watch('status');
  const description = watch('description');

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
            <div className="md:col-span-2">
              <Field withRequiredMark label={t('course_combo:name')} error={errors.name?.message}>
                <Input
                  value={name}
                  onChange={event => {
                    setValue('name', event.target.value);
                    if (errors.name) {
                      trigger('name');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('course_combo:name')}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field withRequiredMark label={t('course_combo:course_roadmap')} error={errors.courseRoadmapIds?.message}>
                <SelectCourseRoadmaps
                  courseRoadmaps={courseRoadmapIds}
                  onChange={(value, courseRoadmaps) => {
                    const totalPrice = sum((courseRoadmaps ?? [])?.map(courseRoadmap => courseRoadmap.rawData.price));
                    const totalNumberSessions = sum(
                      (courseRoadmaps ?? [])?.map(courseRoadmap => {
                        return courseRoadmap.rawData.numberSessions;
                      }),
                    );
                    setValue('courseRoadmapIds', value);
                    setValue('totalPrice', totalPrice);
                    setValue('totalNumberSessions', totalNumberSessions);
                    setValue(
                      'displayTotalSessionDuration',
                      getDisplaySessionDuration({
                        courseRoadmaps: courseRoadmaps?.map(item => ({
                          code: item.rawData.code,
                          sessionDuration: item.rawData.sessionDuration,
                        })),
                      }),
                      // courseRoadmaps
                      //   ?.map(courseRoadmap => {
                      //     return [courseRoadmap.rawData.code, courseRoadmap.rawData.sessionDuration].join(' - ');
                      //   })
                      //   .join(', '),
                    );
                    if (errors.courseRoadmapIds) {
                      trigger('courseRoadmapIds');
                    }
                  }}
                  disabled={disabledField}
                />
              </Field>
            </div>
            <Field label={t('course_combo:number_session_with_measure')} error={errors.totalNumberSessions?.message}>
              <InputNumber
                min={0}
                className="w-full"
                disabled
                placeholder={t('course_combo:number_session_with_measure')}
                value={totalNumberSessions}
                onChange={value => {
                  setValue('totalNumberSessions', value ?? undefined);
                  if (errors.totalNumberSessions) {
                    trigger('totalNumberSessions');
                  }
                }}
              />
            </Field>
            <Field
              label={t('course_combo:session_duration_with_measure')}
              error={errors.displayTotalSessionDuration?.message}
            >
              <Input
                className="w-full"
                disabled
                placeholder={t('course_combo:session_duration_with_measure')}
                value={displayTotalSessionDuration ?? undefined}
                onChange={event => {
                  setValue('displayTotalSessionDuration', event.target.value);
                  if (errors.displayTotalSessionDuration) {
                    trigger('displayTotalSessionDuration');
                  }
                }}
              />
            </Field>
            <Field label={t('course_combo:fee_with_measure')} error={errors.totalPrice?.message}>
              <InputNumber
                min={0}
                className="w-full"
                disabled
                placeholder={t('course_combo:fee_with_measure')}
                value={totalPrice}
                formatter={value => {
                  return currencyFormatter(value) ?? '';
                }}
                parser={value => currencyParser(value) ?? 0}
                onChange={value => {
                  setValue('totalPrice', value ?? undefined);
                  if (errors.totalPrice) {
                    trigger('totalPrice');
                  }
                }}
              />
            </Field>
            <Field withRequiredMark label={t('course_combo:status')} error={errors.status?.message}>
              <SelectCourseStatus
                allowClear={false}
                courseStatus={status ?? undefined}
                onChange={value => {
                  setValue('status', value);
                  if (errors.status) {
                    trigger('status');
                  }
                }}
                disabled={disabledField}
                placeholder={t('course_combo:status')}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label={t('course_combo:description')} error={errors.description?.message}>
                <Input.TextArea
                  rows={6}
                  minLength={0}
                  maxLength={256}
                  showCount
                  value={description ?? undefined}
                  onChange={event => {
                    setValue('description', event.target.value);
                    if (errors.description) {
                      trigger('description');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('course_combo:description')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
