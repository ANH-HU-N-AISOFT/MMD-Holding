import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import './styles.css';

export interface ModalProps extends AntModalProps {}

export const Modal = (props: ModalProps) => {
  const { t } = useTranslation(['components']);

  const okText = props.okText ?? t('components:Modal.ok');
  const cancelText = props.cancelText ?? t('components:Modal.cancel');

  return (
    <AntModal
      {...props}
      wrapClassName={classNames('Modal__container', props.className)}
      okText={okText}
      cancelText={cancelText}
    />
  );
};
