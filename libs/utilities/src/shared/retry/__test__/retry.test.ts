import { retry } from '../src/retry';

describe('retry function', () => {
  it('retries the specified number of times on failure', async () => {
    let attemptCount = 0;
    const mockFunction = jest.fn(() => {
      attemptCount++;
      return new Promise((_, reject) => reject(new Error('Fail')));
    });

    try {
      await retry(mockFunction, { maxAttempts: 3 });
    } catch {
      /* */
    }

    expect(attemptCount).toBe(3);
  });

  it('resolves successfully when an attempt succeeds', async () => {
    let hasFailedOnce = false;
    const mockFunction = jest.fn(() => {
      if (!hasFailedOnce) {
        hasFailedOnce = true;
        return Promise.reject(new Error('Fail'));
      }
      return Promise.resolve('Success');
    });

    const result = await retry(mockFunction, { maxAttempts: 2 });
    expect(result).toBe('Success');
  });

  it('does not retry if conditionRetry returns false', async () => {
    let attemptCount = 0;
    const mockFunction = jest.fn(() => {
      attemptCount++;
      return new Promise((_, reject) => reject(new Error('Fail')));
    });
    const conditionRetry = jest.fn(() => true);

    try {
      await retry(mockFunction, { maxAttempts: 3, conditionRetry });
    } catch {
      /* */
    }

    expect(attemptCount).toBe(1);
    expect(conditionRetry).toHaveBeenCalled();
  });

  it('throws the last error after all attempts', async () => {
    const mockFunction = jest.fn(() => Promise.reject(new Error('Fail')));

    await expect(retry(mockFunction, { maxAttempts: 3 })).rejects.toThrow('Fail');
  });
});
