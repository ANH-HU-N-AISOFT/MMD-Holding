import { RTHandleError } from './@types/RemixJsonFunction';
import type { SimpleActionResponse } from '~/@types/SimpleActionResponse';

export const handleUnknownError = <Model = any, FieldsError = any>(
  error: unknown,
): RTHandleError<SimpleActionResponse<Model, FieldsError>> => {
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
    },
    { status: 400 },
  ];
};
