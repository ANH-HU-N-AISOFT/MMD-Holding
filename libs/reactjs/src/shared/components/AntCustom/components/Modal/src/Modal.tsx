import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import './styles.css';
import { isBrowser } from 'utilities';
import { useDeepCompareEffect } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { Button, ButtonProps } from '../../Button';

export interface Props
  extends Pick<
    AntModalProps,
    | 'open'
    | 'onCancel'
    | 'onOk'
    | 'className'
    | 'cancelText'
    | 'okText'
    | 'maskClosable'
    | 'zIndex'
    | 'width'
    | 'centered'
    | 'closable'
    | 'confirmLoading'
    | 'children'
    | 'title'
  > {
  /** Properties for the OK button. */
  okButtonProps?: Pick<ButtonProps, 'className' | 'color' | 'disabled' | 'htmlType' | 'form' | 'onClick'>;
  /** Properties for the cancel button. */
  cancelButtonProps?: Pick<ButtonProps, 'className' | 'color' | 'disabled' | 'htmlType' | 'form' | 'onClick'>;
  /** Footer content of the modal dialog. Set to `null` to hide the default footer. */
  footer?: ReactNode;
  /** Content to be displayed on the left side of the footer. */
  FooterLeft?: ReactNode;
  /** Mode of the footer, either 'sticky' or 'none'. */
  footerMode?: 'sticky' | 'none';
}

/**
 * Modal component that provides a customizable modal dialog with type safety.
 *
 * @param {Props} props - The properties for the Modal component.
 * @param {boolean} props.open - Whether the modal dialog is visible.
 * @param {() => void} props.onCancel - Callback function invoked when the cancel button is clicked or the modal is closed.
 * @param {() => void} props.onOk - Callback function invoked when the OK button is clicked.
 * @param {string} [props.className] - Custom CSS class for styling the modal.
 * @param {string} [props.cancelText] - Text of the cancel button.
 * @param {string} [props.okText] - Text of the OK button.
 * @param {boolean} [props.maskClosable] - Whether the modal can be closed by clicking the mask.
 * @param {number} [props.zIndex] - The z-index of the modal.
 * @param {string | number} [props.width] - The width of the modal dialog.
 * @param {ButtonProps} [props.okButtonProps] - Properties for the OK button.
 * @param {ButtonProps} [props.cancelButtonProps] - Properties for the cancel button.
 * @param {boolean} [props.centered] - Whether to center the modal dialog vertically in the screen.
 * @param {boolean} [props.closable] - Whether a close (x) button is visible on top right of the modal dialog.
 * @param {boolean} [props.confirmLoading] - Whether to apply a loading visual effect on the OK button while an operation is being performed.
 * @param {ReactNode} [props.children] - Content to be displayed inside the modal.
 * @param {ReactNode | string} [props.title] - Title of the modal dialog.
 * @param {ReactNode | null} [props.footer] - Footer content of the modal dialog. Set to `null` to hide the default footer.
 * @param {ReactNode} [props.FooterLeft] - Content to be displayed on the left side of the footer.
 * @param {'sticky' | 'none'} [props.footerMode] - Mode of the footer, either 'sticky' or 'none'.
 * @returns {ReactNode} The rendered Modal component.
 */
export const Modal: FC<Props> = ({
  cancelText = 'Cancel',
  centered,
  className,
  closable,
  confirmLoading,
  maskClosable,
  okText = 'OK',
  onCancel,
  onOk,
  open,
  width,
  zIndex,
  children,
  title,
  footer,
  FooterLeft,
  cancelButtonProps,
  okButtonProps,
  footerMode = 'sticky',
}) => {
  useInitializeContext();

  const [openState, setOpenState] = useState(!isBrowser() ? false : open);

  const handleCancel: AntModalProps['onCancel'] = event => {
    if (onCancel) {
      onCancel?.(event);
    } else {
      setOpenState(false);
    }
    cancelButtonProps?.onClick?.(event);
  };
  const handleOk: AntModalProps['onOk'] = event => {
    if (onOk) {
      onOk?.(event);
    } else {
      setOpenState(false);
    }
    okButtonProps?.onClick?.(event);
  };

  useDeepCompareEffect(() => {
    setOpenState(open);
  }, [open]);

  return (
    <AntModal
      destroyOnClose
      wrapClassName={classNames('Modal__container', footerMode === 'sticky' ? 'Modal--footerSticky' : '', className)}
      cancelText={cancelText}
      centered={centered}
      closable={closable}
      confirmLoading={confirmLoading}
      maskClosable={maskClosable}
      okText={okText}
      onCancel={onCancel}
      onOk={onOk}
      open={openState}
      width={width}
      zIndex={zIndex}
      children={children}
      title={title}
      footer={() => {
        if (typeof footer !== 'undefined') {
          return footer;
        }
        return (
          <div className="Modal__footer">
            <div>{FooterLeft}</div>
            <div className="Modal__buttons">
              <Button
                {...cancelButtonProps}
                disabled={cancelButtonProps?.disabled ?? confirmLoading}
                onClick={handleCancel}
              >
                {cancelText}
              </Button>
              <Button
                {...okButtonProps}
                color={okButtonProps?.color ?? 'primary'}
                loading={confirmLoading}
                onClick={handleOk}
              >
                {okText}
              </Button>
            </div>
          </div>
        );
      }}
    />
  );
};
