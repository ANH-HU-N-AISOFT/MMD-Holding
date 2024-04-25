import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { isBrowser } from 'utilities';
import type { HTMLAttributes, ReactNode } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isVisible?: boolean;
}

export const SickyAction = ({ children, isVisible = false, ...props }: Props) => {
  const Content = (
    <div
      {...props}
      className={classNames(
        'fixed bottom-16 left-1/2 -translate-x-1/2 rounded-xl bg-primary-base px-3 py-2 backdrop-blur-md sm:px-4 sm:py-3 transition-all bg-white',
        isVisible ? 'opacity-100 -translate-y-10' : 'opacity-0',
        props.className,
      )}
      style={{
        ...props.style,
        boxShadow: `0px 32px 48px -8px #0000001A, 0px 0px 14px 0px #0000000D, 0px 40px 64px -12px #00000014`,
      }}
    >
      {children}
    </div>
  );

  if (isBrowser()) {
    return createPortal(Content, document.body);
  }

  return Content;
};
