import { renderHook } from '@testing-library/react';
import { usePrevious } from '../src/usePrevious';

describe('usePrevious', () => {
  it('initially returns undefined', () => {
    const { result } = renderHook(() => usePrevious(0));

    expect(result.current).toBeUndefined();
  });

  it('returns the previous value after a component update', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    // After the first render, the previous value should be undefined
    expect(result.current).toBeUndefined();

    // Update the hook to a new value
    rerender({ value: 1 });

    // Now, the previous value should be the initial value
    expect(result.current).toBe(0);

    // Update the hook to another new value
    rerender({ value: 2 });

    // The previous value should now be the first updated value
    expect(result.current).toBe(1);
  });

  it('handles multiple updates', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    rerender({ value: 'third' });
    expect(result.current).toBe('second');

    rerender({ value: 'fourth' });
    expect(result.current).toBe('third');
  });
});
