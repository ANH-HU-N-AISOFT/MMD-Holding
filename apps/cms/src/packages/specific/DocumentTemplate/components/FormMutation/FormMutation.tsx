import { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Textarea, notification } from 'reactjs';
import { useDeepCompareEffect } from 'reactjs';
import { v4 } from 'uuid';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { UploadSingle } from '~/components/AntCustom/Upload';
import { FileState } from '~/components/AntCustom/Upload/src/types/FileState';
import { DefaultResult } from '~/components/AntCustom/Upload/src/UploadSingle/DefaultResult';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectDocumentTemplateStatus } from '~/packages/common/SelectVariants/DocumentTemplateStatus/SelectDocumentTemplateStatus';
import { SelectDocumentTemplateType } from '~/packages/common/SelectVariants/DocumentTemplateType/SelectDocumentTemplateType';
import { fetchApi } from '~/utils/functions/fetchApi';
import { getFileNameFromUrl } from '~/utils/functions/getFileNameFromUrl';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

interface StateItem {
  src: string;
}

export const FormMutation = ({ uid, defaultValues = {}, fieldsError = {}, isSubmiting, onSubmit, disabled }: Props) => {
  const { t } = useTranslation(['common', 'document_template']);

  const [uploadFilesState, setUploadFilesState] = useState<FileState<StateItem> | undefined>(undefined);

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
    setUploadFilesState(
      defaultValues.file
        ? {
            file: { name: getFileNameFromUrl(defaultValues.file), size: 0 },
            status: 'success',
            uid: v4(),
            response: { src: defaultValues.file },
            progressPercent: 100,
          }
        : undefined,
    );
  }, [defaultValues]);

  const formValues = watch();

  useEffect(() => {
    const value = uploadFilesState?.response?.src;
    setValue('file', value);
    if (errors.file) {
      trigger('file');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFilesState]);

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
              <Field withRequiredMark label={t('document_template:status')} error={errors.status?.message}>
                <SelectDocumentTemplateStatus
                  disabled={disabledField}
                  documentTemplateStatus={formValues.status}
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
              <Field tagName="div" withRequiredMark label={t('document_template:file')} error={errors.file?.message}>
                <div className="grid grid-cols-1 gap-1">
                  <UploadSingle<StateItem>
                    disabled={disabledField}
                    onStateChange={setUploadFilesState}
                    request={async ({ file, onUploadProgress }) => {
                      try {
                        await fetchApi.request({
                          method: 'POST',
                          url: 'https://jsonplaceholder.typicode.com/todos',
                          onUploadProgress,
                        });
                        return { src: `https://projects.wojtekmaj.pl/react-pdf/assets/${file.name}` };
                      } catch (error) {
                        notification.error({
                          message: t('common:upload_failure'),
                          description: handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error)),
                        });
                        return;
                      }
                    }}
                  >
                    <UploadSingle.DefaultChildren />
                  </UploadSingle>
                  <DefaultResult
                    disabled={disabledField}
                    onClick={() => {
                      if (uploadFilesState?.response) {
                        window.open(uploadFilesState?.response?.src);
                      }
                    }}
                    fileState={uploadFilesState}
                    onRemove={() => setUploadFilesState(undefined)}
                  />
                </div>
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
