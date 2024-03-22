import { delay } from '../../delay';

interface RetryOptions {
  /** Maximum number of attempts to retry the operation. */
  maxAttempts?: number;
  /** Length of delay in milliseconds between each retry attempt. */
  delayLength?: number;
  /** Function to determine whether to retry based on the encountered error. Returns true to retry. */
  conditionRetry?: (error: unknown) => boolean;
}

/**
 * Retries a given asynchronous operation a specified number of times with delays.
 *
 * @param {() => Promise<T>} promiseFactory - A function that returns the promise to be retried.
 * @param {RetryOptions} options - Configuration options for retrying the operation.
 *        Includes maxAttempts, delayLength, and conditionRetry.
 * @returns {Promise<T>} - The result of the promise factory function, if successful.
 * @throws - The last encountered error after all retry attempts have been exhausted.
 */
export const retry = async <T>(
  promiseFactory: () => Promise<T>,
  { maxAttempts = 3, delayLength = 200, conditionRetry }: RetryOptions = {},
): Promise<T> => {
  let result: T | null = null;
  let error: any;
  let success = false;

  let attempt = 1;
  while (!success && attempt <= maxAttempts) {
    if (attempt > 1) {
      await delay(delayLength);
    }

    try {
      result = await promiseFactory();
      success = true;
    } catch (e) {
      if (!conditionRetry?.(e)) {
        error = e;
        attempt++;
      } else {
        break;
      }
    }
  }

  if (success) {
    return result as T;
  } else {
    throw error;
  }
};
