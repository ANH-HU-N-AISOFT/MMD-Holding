import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Input, InputNumber, Textarea } from 'reactjs';
import { useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectCourseStatus } from '~/packages/common/SelectVariants/CourseStatus/SelectCourseStatus';
import { SelectCourse } from '~/packages/common/SelectVariants/SelectCourse';
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
  const { t } = useTranslation(['common', 'course_roadmap']);

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
    resolver: getFormMutationResolver(t as TFunction<['common', 'course_roadmap']>),
  });
  const name = watch('name');
  const code = watch('code');
  const courseId = watch('courseId');
  const numberSessions = watch('numberSessions');
  const sessionDuration = watch('sessionDuration');
  const price = watch('price');
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
            <Field withRequiredMark label={t('course_roadmap:name')} error={errors.name?.message}>
              <Input
                value={name}
                onChange={value => {
                  setValue('name', value);
                  if (errors.name) {
                    trigger('name');
                  }
                }}
                disabled={disabledField}
                placeholder={t('course_roadmap:name')}
              />
            </Field>
            <Field withRequiredMark label={t('course_roadmap:code')} error={errors.code?.message}>
              <Input
                value={code}
                onChange={value => {
                  setValue('code', value);
                  if (errors.code) {
                    trigger('code');
                  }
                }}
                disabled={disabledField}
                placeholder={t('course_roadmap:code')}
              />
            </Field>
            <Field withRequiredMark label={t('course_roadmap:course')} error={errors.courseId?.message}>
              <SelectCourse
                course={courseId}
                onChange={value => {
                  setValue('courseId', value);
                  if (errors.courseId) {
                    trigger('courseId');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field withRequiredMark label={t('course_roadmap:status')} error={errors.status?.message}>
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
                placeholder={t('course_roadmap:status')}
              />
            </Field>
            <Field
              withRequiredMark
              label={t('course_roadmap:number_session_with_measure')}
              error={errors.numberSessions?.message}
            >
              <InputNumber
                min={0}
                className="w-full"
                disabled={disabledField}
                placeholder={t('course_roadmap:number_session_with_measure')}
                value={numberSessions}
                onChange={value => {
                  setValue('numberSessions', value ?? undefined);
                  if (errors.numberSessions) {
                    trigger('numberSessions');
                  }
                }}
              />
            </Field>
            <Field
              withRequiredMark
              label={t('course_roadmap:session_duration_with_measure')}
              error={errors.sessionDuration?.message}
            >
              <InputNumber
                min={0}
                className="w-full"
                disabled={disabledField}
                placeholder={t('course_roadmap:session_duration_with_measure')}
                value={sessionDuration}
                onChange={value => {
                  setValue('sessionDuration', value ?? undefined);
                  if (errors.sessionDuration) {
                    trigger('sessionDuration');
                  }
                }}
              />
            </Field>
            <Field withRequiredMark label={t('course_roadmap:fee_with_measure')} error={errors.price?.message}>
              <InputNumber
                min={0}
                className="w-full"
                disabled={disabledField}
                placeholder={t('course_roadmap:fee_with_measure')}
                value={price}
                formatter={value => {
                  return currencyFormatter(value) ?? '';
                }}
                parser={value => currencyParser(value) ?? 0}
                onChange={value => {
                  setValue('price', value ?? undefined);
                  if (errors.price) {
                    trigger('price');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label={t('course_roadmap:description')} error={errors.description?.message}>
                <Textarea
                  rows={6}
                  showCount
                  maxLength={256}
                  value={description ?? undefined}
                  onChange={value => {
                    setValue('description', value);
                    if (errors.description) {
                      trigger('description');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('course_roadmap:description')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
