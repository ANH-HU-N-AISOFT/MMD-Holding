import { AxiosError } from 'axios';
import { handleAxiosError } from './handleAxiosError';
import { handleNativeError } from './handleNativeError';
import { handleUnknownError } from './handleUnknownError';
import { json } from '~/overrides/@remix';

export const handleCatchClauseSimple = async <Model = any, FieldsError = any>(error: unknown) => {
  if (error instanceof AxiosError) {
    return json(...(await handleAxiosError<Model, FieldsError>(error)));
  } else if (error instanceof Error) {
    return json(...handleNativeError<Model, FieldsError>(error));
  }
  return json(...handleUnknownError<Model, FieldsError>(error));
};

export const handleCatchClauseSimpleAtClient = async <Model = any, FieldsError = any>(error: unknown) => {
  if (error instanceof AxiosError) {
    return (await handleAxiosError<Model, FieldsError>(error))[0];
  } else if (error instanceof Error) {
    return handleNativeError<Model, FieldsError>(error)[0];
  }
  return handleUnknownError<Model, FieldsError>(error)[0];
};
