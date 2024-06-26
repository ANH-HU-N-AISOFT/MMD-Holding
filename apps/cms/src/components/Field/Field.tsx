import classNames from 'classnames';
import { createElement } from 'react';
import type { HtmlHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

interface Props {
  label: ReactNode;
  error?: ReactNode;
  help?: ReactNode;
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
}: Pick<Props, 'error'> & Omit<HtmlHTMLAttributes<HTMLDivElement>, 'children'>) => {
  return (
    <div {...props} className={classNames('text-xs font-medium text-status-red', className)}>
      {error}
    </div>
  );
};

export const FieldHelp = ({
  help,
  className,
  ...props
}: Pick<Props, 'help'> & Omit<HtmlHTMLAttributes<HTMLDivElement>, 'children'>) => {
  return (
    <div {...props} className={classNames('text-xs font-medium text-neutral-500', className)}>
      {help}
    </div>
  );
};

export const Field = ({
  label,
  children,
  error,
  help,
  withRequiredMark,
  tagName = 'label',
  className,
  fieldWrapperClassName,
  labelWrapperClassName,
}: PropsWithChildren<Props>) => {
  const renderRequiredMark = () => {
    if (withRequiredMark) {
      return <span className="text-status-red ml-1 text-sm font-medium">*</span>;
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
      {!!help && <FieldHelp className="mt-2" help={help} />}
      {!!error && <FieldError className="mt-2" error={error} />}
    </>,
  );
};
