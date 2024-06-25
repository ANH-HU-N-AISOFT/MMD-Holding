import { useTranslation } from 'react-i18next';
import { Modal as AntModal, ModalProps as AntModalProps } from 'reactjs';

export interface ModalWithI18nProps extends AntModalProps {}

export const ModalWithI18n = (props: ModalWithI18nProps) => {
  const { t } = useTranslation(['components']);

  const okText = props.okText ?? t('components:Modal.ok');
  const cancelText = props.cancelText ?? t('components:Modal.cancel');

  return <AntModal {...props} okText={okText} cancelText={cancelText} />;
};
