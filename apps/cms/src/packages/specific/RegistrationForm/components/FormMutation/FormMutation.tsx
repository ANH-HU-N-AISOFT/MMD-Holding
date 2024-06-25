import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { ChangeCourseOrPromotionInformation } from './components/ChangeCourseOrPromotionInformation';
import { CourseInformation } from './components/CourseInformation';
import { FeeInformation } from './components/FeeInformation';
import { StudentInformation } from './components/StudentInformation';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';

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
  const { t } = useTranslation(['common', 'registration_form']);

  const disabledField = disabled || isSubmiting;

  const form = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues,
    resolver: getFormMutationResolver(t),
  });
  const { handleSubmit, setError, reset } = form;

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
            <StudentInformation isEdit={isEdit} form={form} disabledField={disabledField} />
            <CourseInformation form={form} disabledField={disabledField} />
            <FeeInformation isEdit={isEdit} form={form} disabledField={disabledField} />
            <ChangeCourseOrPromotionInformation form={form} disabledField={disabledField} />
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
