# Overview

The `retry` function is an advanced utility designed for Node.js applications to handle the execution of asynchronous operations with a retry mechanism. It is highly beneficial for operations that might fail due to transient issues and can succeed upon subsequent attempts. The function offers customization for the number of retry attempts, the delay between these attempts, and allows for defining a condition-based retry logic.

# API

##### Parameters

- **promiseFactory**: `() => Promise<T>`: A function that returns the promise to be retried.
- **options**: `RetryOptions` (optional): Configuration options for retrying the operation, which include:
  - **maxAttempts**: `number`: Maximum number of retry attempts.
  - **delayLength**: `number`: The delay in milliseconds between each attempt.
  - **conditionRetry**: `(error: unknown) => boolean`: A function to determine whether to retry based on the encountered error.

##### Return Value

- Returns a `Promise<T>` that resolves to the result of the promise factory function, if successful, or throws the last encountered error after all retry attempts have been exhausted.

# Examples

1. **Retrying an asynchronous operation**

```typescript
import { retry } from 'path-to-retry-function';

const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    if (Math.random() > 0.5) {
      resolve('Data fetched successfully');
    } else {
      reject(new Error('Failed to fetch data'));
    }
  });
};

retry(fetchData, { maxAttempts: 3, delayLength: 1000 })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```
