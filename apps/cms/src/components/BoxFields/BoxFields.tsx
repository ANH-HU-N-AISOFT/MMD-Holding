import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  title?: ReactNode;
  children: ReactNode;
}

export const BoxFields = ({ children, title, className, ...props }: Props) => {
  return (
    <div {...props} className={classNames('rounded-2xl bg-white px-2 md:px-4 py-4 md:py-6', className)}>
      {title && <h1 className="text-md mb-6 font-semibold text-neutral-700 sm:text-xl">{title}</h1>}
      <div>{children}</div>
    </div>
  );
};
