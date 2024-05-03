import { keys } from 'ramda';
import type { RTHandleError } from './@types/RemixJsonFunction';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import type { SimpleResponse } from '~/packages/@base/types/SimpleResponse';

export const handleFormResolverError = <FormValues extends FieldValues = any, Model = any, FieldsError = any>(
  errors: FieldErrors<FormValues>,
): RTHandleError<SimpleResponse<Model, FieldsError>> => {
  console.log('handleFormResolverError', errors);
  return [
    {
      message: 'FormResolver',
      hasError: true,
      error: errors.root?.message,
      info: undefined,
      fieldsError: keys(errors).reduce<SimpleResponse<any, any>['fieldsError']>((result, fieldError) => {
        return {
          ...result,
          [fieldError]: errors[fieldError]?.message,
        };
      }, {}),
    },
    { status: 400 },
  ];
};
