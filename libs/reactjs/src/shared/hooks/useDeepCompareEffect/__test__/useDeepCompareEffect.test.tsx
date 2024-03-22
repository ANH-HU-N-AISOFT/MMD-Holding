import { act, render } from '@testing-library/react';
import { FC } from 'react';
import { useDeepCompareEffect } from '../src/useDeepCompareEffect';

// Mock component to test the hook
const MockComponent: FC<{ dependency: any; effectCallback: Function }> = ({ dependency, effectCallback }) => {
  useDeepCompareEffect(() => {
    effectCallback();
  }, [dependency]);

  return <div />;
};

describe('useDeepCompareEffect', () => {
  it('should execute the effect callback when the dependency changes deeply', () => {
    const effectCallback = jest.fn();
    const initialDependency = { a: 1 };
    const { rerender } = render(<MockComponent effectCallback={effectCallback} dependency={initialDependency} />);

    // Update dependency with a deep change
    const newDependency = { a: 2 };

    act(() => {
      rerender(<MockComponent effectCallback={effectCallback} dependency={newDependency} />);
    });

    // Expect the effect callback to have been called twice: once on mount and once on update
    expect(effectCallback).toHaveBeenCalledTimes(2);
  });

  it('should not execute the effect callback when the dependency does not change deeply', () => {
    const effectCallback = jest.fn();
    const initialDependency = { a: 1 };
    const { rerender } = render(<MockComponent effectCallback={effectCallback} dependency={initialDependency} />);

    // Update dependency without deep change
    const sameDependency = { ...initialDependency };

    act(() => {
      rerender(<MockComponent effectCallback={effectCallback} dependency={sameDependency} />);
    });

    // Expect the effect callback to have been called only once (on mount)
    expect(effectCallback).toHaveBeenCalledTimes(1);
  });
});
