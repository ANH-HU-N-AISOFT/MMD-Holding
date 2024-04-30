import { Modal, ModalProps } from 'antd';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface ModalConfirmDeleteProps extends Pick<ModalProps, 'open' | 'onCancel' | 'onOk'> {
  title: ReactNode;
  description?: ReactNode;
  loading?: boolean;
}

export const ModalConfirmDelete = ({ title, description, loading, ...props }: ModalConfirmDeleteProps) => {
  const { t } = useTranslation(['components']);
  return (
    <Modal
      {...props}
      title=""
      okButtonProps={{ danger: true }}
      confirmLoading={loading}
      okText={t('components:ModalDelete.ok')}
      cancelText={t('components:ModalDelete.cancel')}
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-error/20">
          <span className="text-2xl text-status-red">
            <svg width="1em" height="1.0em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5099 5.85002L13.5699 2.42002C13.0906 2.14482 12.5476 2 11.9949 2C11.4422 2 10.8992 2.14482 10.4199 2.42002L4.48993 5.85002C4.01163 6.12722 3.61474 6.52544 3.33914 7.00466C3.06355 7.48388 2.91896 8.02721 2.91993 8.58002V15.42C2.92147 15.9723 3.06712 16.5147 3.34246 16.9935C3.61781 17.4723 4.01333 17.8709 4.48993 18.15L10.4299 21.58C10.9092 21.8552 11.4522 22 12.0049 22C12.5576 22 13.1006 21.8552 13.5799 21.58L19.5199 18.15C19.9982 17.8728 20.3951 17.4746 20.6707 16.9954C20.9463 16.5162 21.0909 15.9728 21.0899 15.42V8.58002C21.0856 8.0271 20.9377 7.48479 20.6607 7.00622C20.3837 6.52765 19.9872 6.12924 19.5099 5.85002V5.85002ZM11.2499 7.75002C11.2499 7.55111 11.3289 7.36034 11.4696 7.21969C11.6102 7.07904 11.801 7.00002 11.9999 7.00002C12.1988 7.00002 12.3896 7.07904 12.5303 7.21969C12.6709 7.36034 12.7499 7.55111 12.7499 7.75002V13C12.7499 13.1989 12.6709 13.3897 12.5303 13.5303C12.3896 13.671 12.1988 13.75 11.9999 13.75C11.801 13.75 11.6102 13.671 11.4696 13.5303C11.3289 13.3897 11.2499 13.1989 11.2499 13V7.75002ZM12.9199 16.63C12.8692 16.7512 12.7982 16.8628 12.7099 16.96C12.57 17.0999 12.3914 17.1947 12.1971 17.2322C12.0028 17.2696 11.8018 17.2479 11.6199 17.17C11.4975 17.1217 11.3855 17.0504 11.2899 16.96C11.2019 16.8605 11.1279 16.7495 11.0699 16.63C11.0218 16.5092 10.998 16.3801 10.9999 16.25C10.9992 15.9844 11.1034 15.7292 11.2899 15.54C11.3855 15.4496 11.4975 15.3783 11.6199 15.33C11.802 15.2534 12.0028 15.2325 12.1967 15.2699C12.3907 15.3073 12.5693 15.4013 12.7099 15.54C12.8003 15.6356 12.8716 15.7476 12.9199 15.87C12.9727 15.9898 13 16.1192 13 16.25C13 16.3809 12.9727 16.5103 12.9199 16.63V16.63Z" />
            </svg>
          </span>
        </div>
        <div>
          <p className="mb-2 text-xl font-semibold text-neutral-700">{title}</p>
          <p className="text-sm font-medium text-neutral-500">{description}</p>
        </div>
      </div>
    </Modal>
  );
};
