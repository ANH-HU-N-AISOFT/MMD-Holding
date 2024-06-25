import classNames from 'classnames';
import { createElement, forwardRef } from 'react';
import type { ReactNode, HtmlHTMLAttributes } from 'react';

export interface Props {
  label: ReactNode;
  children: ReactNode;
  error?: ReactNode;
  withRequiredMark?: boolean;
  tagName?: keyof HTMLElementTagNameMap;
  className?: string;
  fieldWrapperClassName?: string;
  labelWrapperClassName?: string;
  htmlFor?: string;
}

export const FieldError = ({
  error,
  className,
  ...props
}: Pick<Props, 'error'> & Omit<HtmlHTMLAttributes<HTMLDivElement>, 'children'>): ReactNode => {
  return (
    <div {...props} className={classNames('text-xs font-medium text-status-red', className)}>
      {error}
    </div>
  );
};

export const Field = forwardRef<HTMLElement, Props>((props, ref): ReactNode => {
  const {
    label,
    children,
    error,
    withRequiredMark,
    tagName = 'label',
    className,
    fieldWrapperClassName,
    labelWrapperClassName,
  } = props;

  const renderRequiredMark = (): ReactNode => {
    if (withRequiredMark) {
      return <span className="text-status-red ml-1 text-sm">*</span>;
    }
    return null;
  };

  return createElement(
    tagName,
    {
      className: classNames('cursor-pointer', className),
      ref: ref,
    },
    <>
      <div className={classNames('mb-2 font-medium', labelWrapperClassName)}>
        <span className={classNames('text-sm text-neutral-500')}>{label}</span>
        {renderRequiredMark()}
      </div>
      <div className={classNames('mb-2', fieldWrapperClassName)}>{children}</div>
      {!!error && <FieldError className="mt-2" error={error} />}
    </>,
  );
});

Field.displayName = 'Field';
