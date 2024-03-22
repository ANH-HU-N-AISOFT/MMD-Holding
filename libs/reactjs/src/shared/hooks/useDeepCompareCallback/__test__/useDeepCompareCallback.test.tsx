import { render, fireEvent } from '@testing-library/react';
import React, { FC, useState } from 'react';
import { useDeepCompareCallback } from '../src/useDeepCompareCallback';

const TestComponent: FC<{ obj: object }> = props => {
  const [count, setCount] = useState(0);

  const callback = useDeepCompareCallback(() => {
    return count;
  }, [props.obj]);

  const increment = (): void => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <span>{callback()}</span>
    </div>
  );
};

describe('useDeepCompareCallback', () => {
  it('callback updates only when object content changes', () => {
    const { getByText, rerender } = render(<TestComponent obj={{ a: 1 }} />);
    const incrementButton = getByText('Increment');

    // Initial render
    expect(getByText(/0/)).toBeTruthy();

    // Increment count, obj remains the same
    fireEvent.click(incrementButton);
    expect(getByText(/0/)).toBeTruthy();

    // Rerender with same obj, count should not reset
    rerender(<TestComponent obj={{ a: 1 }} />);
    expect(getByText(/0/)).toBeTruthy();

    // Rerender with different obj, count should still not reset
    rerender(<TestComponent obj={{ a: 2 }} />);
    expect(getByText(/1/)).toBeTruthy();
  });
});
