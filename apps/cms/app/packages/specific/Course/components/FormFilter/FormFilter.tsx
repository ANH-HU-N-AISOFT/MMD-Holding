import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { useRemixForm } from 'remix-hook-form';
import { SearchParams } from '../../types/SearchParams';
import { Field } from '~/components/Field/Field';

export interface FormFilterValues extends Pick<SearchParams, 'status'> {}

interface Props {
  onSubmit?: (formValues: FormFilterValues) => void;
  onReset?: () => void;
  isSubmiting?: boolean;
  formValues?: FormFilterValues;
  uid: string;
}

export const FormFilter = ({ uid, formValues, isSubmiting, onReset, onSubmit }: Props) => {
  const { t } = useTranslation(['courses']);

  const {
    formState: { errors },
    setValue,
    trigger,
    watch,
    handleSubmit,
    reset,
  } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formValues,
    submitHandlers: {
      onValid: onSubmit,
    },
  });
  const status = watch('status');

  const handleResetFormValues = () => {
    reset({
      status: undefined,
    });
    onReset?.();
  };

  useDeepCompareEffect(() => {
    reset(formValues);
  }, [formValues]);

  return (
    <Form id={uid} className="grid grid-cols-1 gap-5" onSubmit={handleSubmit} onReset={handleResetFormValues}>
      <Field label={t('courses:status')} error={errors.status?.message}>
        <select
          value={status}
          className="!w-full"
          disabled={isSubmiting}
          onChange={event => {
            setValue('status', event.target.value);
            trigger('status');
          }}
        >
          <option value="ok">Ok</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </Field>
    </Form>
  );
};
