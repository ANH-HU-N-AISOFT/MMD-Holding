import { renderHook } from '@testing-library/react';
import { useDeepCompareMemo } from '../src/useDeepCompareMemo';

describe('useDeepCompareMemo', () => {
  it('should memoize value based on deep comparison of dependencies', () => {
    let computeCount = 0;
    const factory = (): { result: string } => {
      computeCount++;
      return { result: 'computed value' };
    };

    const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemo(factory, deps), {
      initialProps: { deps: [{ key: 'value' }] },
    });

    // Check initial render
    expect(result.current).toEqual({ result: 'computed value' });
    expect(computeCount).toBe(1);

    // Re-render with the same props
    rerender({ deps: [{ key: 'value' }] });
    expect(result.current).toEqual({ result: 'computed value' });
    expect(computeCount).toBe(1); // No re-computation

    // Re-render with different props
    rerender({ deps: [{ key: 'new value' }] });
    expect(result.current).toEqual({ result: 'computed value' });
    expect(computeCount).toBe(2); // Re-computed
  });
});
