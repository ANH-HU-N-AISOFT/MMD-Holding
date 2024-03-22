import classNames from 'classnames';
import { forwardRef, PropsWithChildren, type HTMLAttributes } from 'react';
import './styles.css';

export type Props = PropsWithChildren<HTMLAttributes<HTMLSpanElement>>;

/**
 * Loading component representing a spinning animation.
 * @param {Props} props - Props for the Loading component.
 * @param {string} props.className - Additional CSS classes.
 * @param {...HTMLAttributes<HTMLSpanElement>} props.props - Other HTML attributes for the component.
 * @param {React.Ref<HTMLDivElement>} ref - Reference to the HTML div element.
 * @returns {JSX.Element} - JSX Element representing the Loading component.
 */
export const Loading = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <span {...props} ref={ref} className={classNames('Loading__container', props.className)} />;
});

Loading.displayName = 'Loading';
