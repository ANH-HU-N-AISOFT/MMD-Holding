import { RTHandleError } from './@types/RemixJsonFunction';
import type { SimpleResponse } from '~/packages/base/types/SimpleResponse';

export const handleUnknownError = <Model = any, FieldsError = any>(
  error: unknown,
): RTHandleError<SimpleResponse<Model, FieldsError>> => {
  console.log('handleUnknownError', error);
  let instanceName = 'Unable to determine the instance name';
  try {
    throw error;
  } catch (error) {
    const stackTrace = (error as Error).stack;
    if (stackTrace) {
      const instanceNameMatch = /at\s+(\w+)\./.exec(stackTrace);
      if (instanceNameMatch?.[1]) {
        instanceName = instanceNameMatch[1];
      }
    }
  }

  return [
    {
      message: 'UnknownError',
      hasError: true,
      error: instanceName,
      info: undefined,
    },
    { status: 400 },
  ];
};
