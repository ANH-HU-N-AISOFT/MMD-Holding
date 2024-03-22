import { renderHook } from '@testing-library/react';
import { useDeepCompareMemoize } from '../src/useDeepCompareMemoize';

describe('useDeepCompareMemoize', () => {
  it('should return the same reference for equal objects', () => {
    const initialDeps = [{ a: 1 }];
    const newDeps = [{ a: 1 }];
    const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemoize(deps), {
      initialProps: { deps: initialDeps },
    });

    const initialMemoizedDeps = result.current;
    rerender({ deps: newDeps });

    expect(result.current).toBe(initialMemoizedDeps);
  });

  it('should return a new reference for unequal objects', () => {
    const initialDeps = [{ a: 1 }];
    const newDeps = [{ a: 2 }];
    const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemoize(deps), {
      initialProps: { deps: initialDeps },
    });

    const initialMemoizedDeps = result.current;
    rerender({ deps: newDeps });

    expect(result.current).not.toBe(initialMemoizedDeps);
  });

  it('should handle primitive values', () => {
    const initialDeps = [1, 'a'];
    const newDeps = [1, 'a'];
    const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemoize(deps), {
      initialProps: { deps: initialDeps },
    });

    const initialMemoizedDeps = result.current;
    rerender({ deps: newDeps });

    expect(result.current).toBe(initialMemoizedDeps);
  });

  it('should handle nested objects', () => {
    const initialDeps = [{ a: { b: 1 } }];
    const newDeps = [{ a: { b: 1 } }];
    const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemoize(deps), {
      initialProps: { deps: initialDeps },
    });

    const initialMemoizedDeps = result.current;
    rerender({ deps: newDeps });

    expect(result.current).toBe(initialMemoizedDeps);
  });
});
