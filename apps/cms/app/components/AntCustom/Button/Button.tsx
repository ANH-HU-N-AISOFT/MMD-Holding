import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import classNames from 'classnames';
import './styles.css';

type Props = AntButtonProps;

export const Button = (props: Props) => {
  return <AntButton {...props} className={classNames(props.className, 'Button__container')} />;
};
export type { Props as ButtonProps };
