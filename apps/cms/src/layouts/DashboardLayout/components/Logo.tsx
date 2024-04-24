import classNames from 'classnames';

interface Props {
  collapsed: boolean;
}

export const Logo = ({ collapsed }: Props) => {
  return (
    <img
      src={collapsed ? 'assets/images/logo-square.png' : 'assets/images/logo.png'}
      alt="Logo"
      className={classNames('inline-block', collapsed ? '' : '')}
    />
  );
};
