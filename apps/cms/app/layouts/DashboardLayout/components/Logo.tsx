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
  // if (collapsed) {
  //   return <LogoWithoutText className="text-[36px] w-full" />;
  // }
  // return <LogoHorizontal variant="small" className="text-[160px] text-white w-full" />;
};
