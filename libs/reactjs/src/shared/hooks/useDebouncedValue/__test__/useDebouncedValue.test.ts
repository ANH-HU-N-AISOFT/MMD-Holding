import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from '../src/useDebouncedValue';

describe('useDebouncedValue', () => {
  jest.useFakeTimers();

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('initial', { timeoutMs: 500 }));
    expect(result.current).toBe('initial');
  });

  it('does not update the value before the timeout when value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, { timeoutMs: 500 }), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'changed' });
    act(() => {
      jest.advanceTimersByTime(499); // Just before the debounce period
    });

    expect(result.current).toBe('initial');
  });

  it('updates the value after the timeout', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, { timeoutMs: 500 }), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'changed' });
    act(() => {
      jest.advanceTimersByTime(500); // Exactly the debounce period
    });

    expect(result.current).toBe('changed');
  });

  it('only updates to the last value after rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, { timeoutMs: 500 }), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'first change' });
    jest.advanceTimersByTime(250); // half-way through the debounce period
    rerender({ value: 'second change' });
    act(() => {
      jest.advanceTimersByTime(500); // Enough time for the debounce to trigger
    });

    expect(result.current).toBe('second change');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
