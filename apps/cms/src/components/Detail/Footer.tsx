import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../AntCustom';
import { TableActions, TableActionsProps } from '../TableActions/TableActions';

interface Props {
  onDelete?: () => void;
  onEdit?: () => void;
  isLoading?: boolean;
  className?: string;
  fitted?: boolean;
  Other?: ReactNode;
  moreActions?: TableActionsProps['items'];
}

export const Footer = ({ onDelete, onEdit, isLoading, className, fitted, Other, moreActions = [] }: Props) => {
  const { t } = useTranslation(['components']);

  const cancelText_ = t('components:Detail.delete').toString();
  const okText_ = t('components:Detail.edit').toString();

  const DeleteButton = (
    <Button danger disabled={isLoading} onClick={onDelete}>
      {cancelText_}
    </Button>
  );
  const EditButton = (
    <Button type="primary" loading={isLoading} disabled={isLoading} onClick={onEdit}>
      {okText_}
    </Button>
  );

  return (
    <div
      className={classNames(
        'border-t-solid sticky bottom-0 z-10 flex flex-col items-end justify-end gap-2 border-t border-t-neutral-300 bg-white py-4 px-4 md:px-8 sm:flex-row sm:items-center rounded-bl-[inherit] rounded-br-[inherit] -ml-4 -mr-4 md:-mr-8 md:-ml-8',
        className,
      )}
    >
      <div className={classNames('flex items-center justify-end gap-3', fitted ? 'w-full' : '')}>
        {DeleteButton}
        {Other}
        {EditButton}
        {!isEmpty(moreActions) && <TableActions items={moreActions} />}
      </div>
    </div>
  );
};
