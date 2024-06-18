import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  percent: number;
  size: 'large' | 'small';
  color?: 'blue' | 'green' | 'red';
}

export const Progress = ({ percent, size, className, color = 'blue', ...props }: Props) => {
  return (
    <div
      {...props}
      className={classNames(
        'relative w-full overflow-hidden rounded-lg bg-neutral-200',
        size === 'large' ? 'h-2' : 'h-1',
        className,
      )}
    >
      <div
        className={classNames('absolute left-0 top-0 h-full transition-all ', {
          'bg-status-blue': color === 'blue',
          'bg-status-green': color === 'green',
          'bg-status-red': color === 'red',
        })}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
