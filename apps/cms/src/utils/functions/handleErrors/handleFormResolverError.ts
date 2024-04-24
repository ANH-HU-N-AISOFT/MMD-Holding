import { keys } from 'ramda';
import type { RTHandleError } from './@types/RemixJsonFunction';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import type { SimpleActionResponse } from '~/@types/SimpleActionResponse';

export const handleFormResolverError = <FormValues extends FieldValues = any, Model = any, FieldsError = any>(
  errors: FieldErrors<FormValues>,
): RTHandleError<SimpleActionResponse<Model, FieldsError>> => {
  console.log('handleFormResolverError', errors);
  return [
    {
      message: 'FormResolver',
      hasError: true,
      error: errors.root?.message,
      fieldsError: keys(errors).reduce<SimpleActionResponse<any, any>['fieldsError']>((result, fieldError) => {
        return {
          ...result,
          [fieldError]: errors[fieldError]?.message,
        };
      }, {}),
    },
    { status: 400 },
  ];
};
