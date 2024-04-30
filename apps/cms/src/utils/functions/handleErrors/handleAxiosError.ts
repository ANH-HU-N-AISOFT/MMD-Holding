import { AxiosError } from 'axios';
import type { RTHandleError } from './@types/RemixJsonFunction';
import type { SimpleActionResponse } from '~/@types/SimpleActionResponse';

interface ResponseFailure {
  statusCode: number;
  message: string;
  errorCode: string;
}
export const handleAxiosError = <Model = any, FieldsError = any>(
  error: AxiosError,
): RTHandleError<SimpleActionResponse<Model, FieldsError>> => {
  console.log('handleAxiosError', error);
  const response = error.response?.data as ResponseFailure;
  return [
    {
      message: 'AxiosError',
      hasError: true,
      error: error.message,
      errorCode: response?.errorCode,
    },
    { status: 400 },
  ];
};
