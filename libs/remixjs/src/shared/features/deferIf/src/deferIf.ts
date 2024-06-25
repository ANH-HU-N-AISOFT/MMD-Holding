import { TypedDeferredData } from '@remix-run/node';
import { defer } from '@remix-run/server-runtime';

// Clone from: https://github.com/oscarnewman/defer-if

/**
 * Just like Remix's `defer`, but for any non-awaited (Promise) value passed in, it will still be awaited (blocking the response)
 * unless the predicate returns true.
 * @param data The data to defer (key, value pairs where value is a Promise or any other value)
 * @param options Configure which values to defer
 * @param options.predicate A function that returns true if the value should be deferred (not awaited)
 * @param options.alwaysAwait An array of keys that should always be awaited (even if predicate returns true)
 * @param options.neverAwait An array of keys that should never be awaited (even if predicate returns false)
 * @returns
 */
export const deferIf = async <T extends Record<string, any>>(
  data: T,
  predicate: (() => boolean) | boolean,
  {
    init,
    alwaysAwait = [],
    neverAwait = [],
  }: {
    init?: number | ResponseInit;
    alwaysAwait?: (keyof T)[];
    neverAwait?: (keyof T)[];
  } = {},
): Promise<TypedDeferredData<T>> => {
  // assert that alwaysAwait and neverAwait are disjoint
  const intersection = alwaysAwait.filter(x => neverAwait.includes(x));
  if (intersection.length > 0) {
    throw new Error(
      `alwaysAwait and neverAwait must be disjoint, but they have the following intersection: ${intersection.join(
        ', ',
      )}`,
    );
  }

  const promises = Object.entries(data).map(async ([key, value]) => {
    let shouldDefer = typeof predicate === 'function' ? predicate() : !!predicate;
    if (neverAwait.includes(key)) {
      shouldDefer = true;
    } else if (alwaysAwait.includes(key)) {
      shouldDefer = false;
    }

    const { val: p } = await deferSingleItemConditionally(value, shouldDefer);
    return [key, p];
  });
  const results = await Promise.all(promises);
  return defer(Object.fromEntries(results) as T, init);
};

/**
 * Function that, when awaited and passed a promise, will immediately return that promise if the
 * predicate is true, or await it if the predicate is false.
 * @param value The value to defer or wait for
 * @param predicate Whether the value should be deferred (aka not awaited) -- true means defer, false means await
 * @returns A promise containing an object containing a promise of the value (has to be this way for some async/await trickery)
 */
export const deferSingleItemConditionally = async <T>(
  value: Promise<T>,
  predicate: boolean,
): Promise<{ val: Promise<T> | T }> => {
  if (predicate) {
    return { val: value };
  }
  return { val: await value };
};
