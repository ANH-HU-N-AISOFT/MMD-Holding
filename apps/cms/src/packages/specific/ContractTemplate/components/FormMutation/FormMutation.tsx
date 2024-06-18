import { Input, notification } from 'antd';
import { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['common', 'contract_template']);

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
    resolver: getFormMutationResolver(t as TFunction<['common', 'contract_template']>),
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
      <Form method="POST" id={uid} onSubmit={handleSubmit}>
        <BoxFields>
          <div className="grid grid-cols-1 gap-3 mb-4">
            <Field withRequiredMark label={t('contract_template:name')} error={errors.name?.message}>
              <Input
                disabled={disabledField}
                placeholder={t('contract_template:name')}
                value={formValues.name}
                onChange={event => {
                  setValue('name', event.target.value);
                  if (errors.name) {
                    trigger('name');
                  }
                }}
              />
            </Field>
            <Field tagName="div" withRequiredMark label={t('contract_template:file')} error={errors.file?.message}>
              <div className="grid grid-cols-1 gap-1">
                <UploadSingle<StateItem>
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
            <Field label={t('contract_template:description')} error={errors.description?.message}>
              <Input.TextArea
                rows={6}
                showCount
                maxLength={256}
                disabled={disabledField}
                placeholder={t('contract_template:description')}
                value={formValues.description ?? ''}
                onChange={event => {
                  setValue('description', event.target.value);
                  if (errors.description) {
                    trigger('description');
                  }
                }}
              />
            </Field>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
