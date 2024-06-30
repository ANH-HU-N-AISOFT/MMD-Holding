import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Input, Textarea, UploadSingle, notification, useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { SelectDocumentTemplateStatus } from '../SelectVariants/SelectDocumentTemplateStatus';
import { SelectDocumentTemplateType } from '../SelectVariants/SelectDocumentTemplateType';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { DraggerSingle } from '~/components/Dragger/DraggerSingle';
import { Field } from '~/components/Field/Field';
import { SingleFileList } from '~/components/FileList/SingleFileList';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';

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
  const { t } = useTranslation(['common', 'document_template']);

  const disabledField = disabled || isSubmiting;

  const {
    handleSubmit,
    setError,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues: {
      ...defaultValues,
    },
    resolver: getFormMutationResolver(t as TFunction<['common', 'document_template']>),
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

  const formValues = watch();

  return (
    <div>
      <Form
        method="POST"
        id={uid}
        onSubmit={event => {
          event.stopPropagation();
          handleSubmit(event);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        <BoxFields>
          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field withRequiredMark label={t('document_template:document_template_type')} error={errors.type?.message}>
              <SelectDocumentTemplateType
                disabled={disabledField}
                documentTemplateType={formValues.type}
                onChange={value => {
                  setValue('type', value);
                  if (errors.type) {
                    trigger('type');
                  }
                }}
              />
            </Field>
            <Field withRequiredMark label={t('document_template:name')} error={errors.name?.message}>
              <Input
                disabled={disabledField}
                placeholder={t('document_template:name')}
                value={formValues.name}
                onChange={value => {
                  setValue('name', value);
                  if (errors.name) {
                    trigger('name');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Field tagName="div" withRequiredMark label={t('document_template:file')} error={errors.file?.message}>
                <div className="grid grid-cols-1 gap-1">
                  <UploadSingle
                    maxFileSize={1024 * 1024 * 2} // 2MB
                    onTooLarge={() => {
                      notification.error({
                        message: t('document_template:upload_failure'),
                        description: t('document_template:file_too_large'),
                      });
                    }}
                    accept=".docx"
                    disabled={disabledField}
                    request={async ({ file }) => {
                      return file;
                    }}
                    onStateChange={fileState => {
                      setValue('file', fileState?.file.originalFile);
                      if (errors.file) {
                        trigger('file');
                      }
                    }}
                  >
                    <DraggerSingle />
                  </UploadSingle>
                  <SingleFileList
                    disabled={disabledField}
                    fileState={formValues.file}
                    onRemove={() => setValue('file', undefined)}
                    onClick={() => {
                      if (formValues.file) {
                        const url =
                          typeof formValues.file === 'string' ? formValues.file : URL.createObjectURL(formValues.file);
                        window.open(url);
                      }
                    }}
                  />
                </div>
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field withRequiredMark label={t('document_template:status')} error={errors.status?.message}>
                <SelectDocumentTemplateStatus
                  allowClear={false}
                  documentTemplateStatus={formValues.status}
                  disabled
                  // disabled={disabledField}
                  placeholder={t('document_template:status')}
                  onChange={value => {
                    setValue('status', value);
                    if (errors.status) {
                      trigger('status');
                    }
                  }}
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label={t('document_template:description')} error={errors.description?.message}>
                <Textarea
                  rows={6}
                  showCount
                  maxLength={256}
                  disabled={disabledField}
                  placeholder={t('document_template:description')}
                  value={formValues.description ?? ''}
                  onChange={value => {
                    setValue('description', value);
                    if (errors.description) {
                      trigger('description');
                    }
                  }}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
