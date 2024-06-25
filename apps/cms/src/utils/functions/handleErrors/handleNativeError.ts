import type { RTHandleError } from './@types/RemixJsonFunction';
import type { SimpleResponse } from '~/packages/base/types/SimpleResponse';

export const handleNativeError = <Model = any, FieldsError = any>(
  error: Error,
): RTHandleError<SimpleResponse<Model, FieldsError>> => {
  console.log('handleNativeError', error);
  return [
    {
      message: 'Error',
      hasError: true,
      error: error.message,
      info: undefined,
    },
    { status: 400 },
  ];
};
