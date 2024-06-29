import { Upload as AntUpload, UploadProps as AntUploadProps } from 'antd';
import { AxiosRequestConfig } from 'axios';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useState } from 'react';
import { AnyRecord } from 'typescript-utilities';
import { v4 } from 'uuid';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';
import { FileState } from './types/FileState';

export interface Props<Response extends AnyRecord>
  extends Pick<AntUploadProps, 'className' | 'children' | 'disabled' | 'accept'> {
  /** The current file state value */
  value?: FileState<Response>;
  /** Function to handle the upload request */
  request: (params: {
    file: File;
    onUploadProgress: AxiosRequestConfig['onUploadProgress'];
  }) => Promise<Response | undefined>;
  /** Callback to handle state change */
  onStateChange?: (filesState: FileState<Response> | undefined) => void;

  /** Limit size of file */
  maxFileSize?: number;
  /** Function to handle file size too large */
  onTooLarge?: () => void;
}

/**
 * UploadSingle component that extends the functionality of the Ant Design Upload component
 * by providing support for single file uploads with additional customization and type safety.
 *
 * @param {Props<Response>} props - The properties for the UploadSingle component.
 * @param {string} [props.className] - Custom CSS class for styling the upload container.
 * @param {ReactNode} [props.children] - The trigger element for the upload.
 * @param {boolean} [props.disabled] - Whether the upload functionality is disabled.
 * @param {string} [props.accept] - Accepted file types for the upload.
 * @param {FileState<Response>} [props.maxFileSize] - Limit size of file
 * @param {FileState<Response>} [props.onTooLarge] - Function to handle file size too large
 * @param {FileState<Response>} [props.value] - The current state of the file upload.
 * @param {(params: { file: File; onUploadProgress: AxiosRequestConfig['onUploadProgress'] }) => Promise<Response>} props.request - The function to handle the file upload request.
 * @param {(filesState: FileState<Response> | undefined) => void} [props.onStateChange] - Callback to handle state changes.
 * @returns {ReactNode} The rendered UploadSingle component.
 */
export const UploadSingle = <Response extends AnyRecord>({
  accept,
  className,
  children,
  disabled,
  value,
  request,
  onStateChange,
  maxFileSize,
  onTooLarge,
}: Props<Response>): ReactNode => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState<FileState<Response> | undefined>(value);

  const handleChange = (): void => {
    const isUndefined = isEmpty(valueState) || null;
    const value = isUndefined ? undefined : valueState;
    onStateChange?.(value);
  };

  useDeepCompareEffect(() => {
    if (isMounted) {
      handleChange();
    }
  }, [valueState]);

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <AntUpload.Dragger
      multiple={false}
      showUploadList={false}
      accept={accept}
      children={children}
      disabled={disabled}
      className={classNames('UploadSingle__container', className)}
      customRequest={async ({ file }) => {
        if (!(file instanceof File)) {
          return;
        }
        if (maxFileSize && file.size > maxFileSize) {
          onTooLarge?.();
        }
        const uid = v4();
        setValueState({
          file: {
            name: file.name,
            size: file.size,
            originalFile: file,
          },
          uid,
          status: 'loading',
          progressPercent: 0,
          response: undefined,
        });
        try {
          const response = await request({
            file,
            onUploadProgress: event => {
              const progress = event.progress ?? 0;
              const percent = progress * 100;
              setValueState(state => {
                if (state) {
                  return {
                    ...state,
                    progressPercent: percent,
                  };
                }
                return;
              });
            },
          });
          setValueState(state => {
            if (state) {
              return {
                ...state,
                response,
                status: 'success',
              };
            }
            return;
          });
        } catch (error) {
          setValueState(state => {
            if (state) {
              return {
                ...state,
                status: 'failure',
              };
            }
            return;
          });
        }
      }}
    />
  );
};
