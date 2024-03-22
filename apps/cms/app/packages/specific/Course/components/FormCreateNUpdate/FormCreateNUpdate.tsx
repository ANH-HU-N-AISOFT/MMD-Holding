import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@remix-run/react';
import { Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { useRemixForm } from 'remix-hook-form';
import { getCreateCourseZodSchema, getUpdateCourseZodSchema } from './constants/zod';
import { FormCreateNUpdateCourseActions } from './types/Actions';
import { FormCreateNUpdateCourseProps } from './types/Props';
import { FormCreateCourseValues, FormUpdateCourseValues } from './types/Values';
import { Field } from '~/components/Field/Field';

export const FormCreateNUpdate = forwardRef<FormCreateNUpdateCourseActions, FormCreateNUpdateCourseProps>(
  ({ isSubmiting, uid, variant, defaultValues, fieldsError = {}, onSubmit }, ref) => {
    const { t } = useTranslation(['common', 'courses']);

    const [openState, setOpenState] = useState(false);

    const {
      handleSubmit,
      setError,
      reset,
      setValue,
      trigger,
      watch,
      formState: { errors },
    } = useRemixForm<Partial<FormCreateCourseValues | FormUpdateCourseValues>>({
      mode: 'onSubmit',
      submitHandlers: {
        onValid: onSubmit as any,
        onInvalid: console.log,
      },
      defaultValues,
      resolver: zodResolver(variant === 'Create' ? getCreateCourseZodSchema(t) : getUpdateCourseZodSchema(t)),
    });

    const title = watch('title');
    const description = watch('description');

    const handleClose = () => {
      setOpenState(false);
      reset(defaultValues);
    };

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
      reset(defaultValues);
    }, [defaultValues]);

    useImperativeHandle(
      ref,
      () => {
        return {
          open: values => {
            setOpenState(true);
            reset(values);
          },
          close: () => {
            handleClose();
          },
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [openState],
    );

    return (
      <Modal
        title={variant === 'Create' ? t('courses:new_course') : t('courses:edit_course')}
        confirmLoading={isSubmiting}
        open={openState}
        onCancel={handleClose}
        okButtonProps={{ htmlType: 'submit', form: uid }}
      >
        <Form id={uid} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3">
            <Field label={t('courses:course_title')} error={errors.title?.message}>
              <input
                disabled={isSubmiting}
                placeholder={t('courses:course_title')}
                value={title}
                onChange={event => {
                  setValue('title', event.target.value);
                  trigger('title');
                }}
              />
            </Field>
            <Field label={t('courses:course_description')} error={errors.description?.message}>
              <textarea
                disabled={isSubmiting}
                placeholder={t('courses:course_description')}
                value={description}
                onChange={event => {
                  setValue('description', event.target.value);
                  trigger('description');
                }}
              />
            </Field>
          </div>
        </Form>
      </Modal>
    );
  },
);

FormCreateNUpdate.displayName = 'FormCreateNUpdate';
