import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'reactjs';

interface Props {
  LessState: ReactNode;
  MoreState: ReactNode;
  disabled: boolean;
  className?: string;
}

export const Collapsed = ({ LessState, MoreState, disabled, className }: Props) => {
  const { t } = useTranslation(['components']);

  const [isShowLess, setIsShowLess] = useState(true);

  return (
    <div>
      {isShowLess ? LessState : MoreState}
      <Typography.Link
        className={classNames(
          '!text-neutral-700 font-semibold hover:!underline',
          disabled ? 'hidden' : 'block',
          className,
        )}
        onClick={() => setIsShowLess(state => !state)}
      >
        {isShowLess ? t('components:Collapsed.show_more') : t('components:Collapsed.show_less')}
      </Typography.Link>
    </div>
  );
};
