import { AxiosError } from 'axios';
import type { RTHandleError } from './@types/RemixJsonFunction';
import type { SimpleActionResponse } from '~/@types/SimpleActionResponse';

interface ResponseFailure {
  statusCode: number;
  message: string | string[];
  errorCode: string;
}
export const SEPARATOR = '_';
export const handleAxiosError = <Model = any, FieldsError = any>(
  error: AxiosError,
): RTHandleError<SimpleActionResponse<Model, FieldsError>> => {
  console.log('handleAxiosError', error);
  const response = error.response?.data as ResponseFailure;
  return [
    {
      message: 'AxiosError',
      hasError: true,
      error: typeof response?.message === 'string' ? response.message : response.message.join(SEPARATOR),
      errorCode: response?.errorCode,
    },
    { status: 400 },
  ];
};
