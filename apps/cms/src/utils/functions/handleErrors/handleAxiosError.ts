import { AxiosError } from 'axios';
import type { RTHandleError } from './@types/RemixJsonFunction';
import type { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { redirect } from '~/overrides/remix';

type ResponseFailure =
  | Blob
  | {
      statusCode: number;
      message: string | string[];
      errorCode: string;
    };
export const SEPARATOR = '_';
export const handleAxiosError = async <Model = any, FieldsError = any>(
  error: AxiosError,
): Promise<RTHandleError<SimpleResponse<Model, FieldsError>>> => {
  if (error.response?.status === 403) {
    throw redirect('/403', {});
  }
  const responseData = error.response?.data as ResponseFailure;
  let message = '';
  try {
    const messageErrorFromResponse =
      responseData instanceof Blob ? JSON.parse(await responseData.text()).message : responseData.message;
    message = Array.isArray(messageErrorFromResponse)
      ? messageErrorFromResponse.join(SEPARATOR)
      : messageErrorFromResponse?.toString();
  } catch {
    message = error.message;
  }
  return [
    {
      message: 'AxiosError',
      hasError: true,
      error: message,
      errorCode: 'errorCode' in responseData ? responseData?.errorCode : '400',
      info: undefined,
    },
    { status: 400 },
  ];
};
