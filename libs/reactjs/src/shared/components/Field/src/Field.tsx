import classNames from 'classnames';
import { createElement } from 'react';
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

export const Field = ({
  label,
  children,
  error,
  withRequiredMark,
  tagName = 'label',
  className,
  fieldWrapperClassName,
  labelWrapperClassName,
}: Props): ReactNode => {
  const renderRequiredMark = (): ReactNode => {
    if (withRequiredMark) {
      return <span className="ml-1 text-sm font-medium text-status-red">*</span>;
    }
    return null;
  };

  return createElement(
    tagName,
    {
      className: classNames('cursor-pointer', className),
    },
    <>
      <div className={classNames('mb-2', labelWrapperClassName)}>
        <span className={classNames('text-sm font-medium text-neutral-500')}>{label}</span>
        {renderRequiredMark()}
      </div>
      <div className={classNames('mb-2', fieldWrapperClassName)}>{children}</div>
      {!!error && <FieldError className="mt-2" error={error} />}
    </>,
  );
};
