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
  extends Pick<AntUploadProps, 'className' | 'children' | 'disabled' | 'accept' | 'beforeUpload'> {
  value?: FileState<Response>[];
  /** Function to handle the file upload request. */
  request: (params: {
    file: File;
    onUploadProgress: AxiosRequestConfig['onUploadProgress'];
  }) => Promise<Response | undefined>;
  /** Callback function triggered when the state of the files changes. */
  onStateChange?: (filesState: FileState<Response>[] | undefined) => void;
  /** Maximum number of files that can be uploaded. */
  maxCount?: number;
}

/**
 * UploadMultiple component extends the functionality of the Ant Design Upload component by providing
 * additional customization and support for multiple file uploads with stricter type safety.
 *
 * @param {Object} props - The properties for the UploadMultiple component.
 * @param {string} [props.className] - Custom CSS class for styling the upload component.
 * @param {ReactNode} [props.children] - Content to be displayed inside the upload area.
 * @param {boolean} [props.disabled] - Whether the upload component is disabled.
 * @param {string} [props.accept] - File types accepted by the upload component.
 * @param {number} [props.maxCount] - Maximum number of files that can be uploaded. Default is `Number.MAX_SAFE_INTEGER`.
 * @param {FileState<any>[]} [props.value] - The current state of the files being uploaded.
 * @param {function} props.request - Function to handle the file upload request.
 * @param {function} [props.onStateChange] - Callback function triggered when the state of the files changes.
 * @param {function} [props.beforeUpload] - Hook to check or modify file before uploading.
 * @returns {ReactNode} The rendered UploadMultiple component.
 */
export const UploadMultiple = <Response extends AnyRecord>({
  accept,
  className,
  children,
  disabled,
  value = [],
  request,
  onStateChange,
  maxCount = Number.MAX_SAFE_INTEGER,
  beforeUpload,
}: Props<Response>): ReactNode => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState<FileState<Response>[]>(value);

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
    setValueState(value ?? []);
  }, [value]);

  return (
    <AntUpload.Dragger
      multiple
      showUploadList={false}
      accept={accept}
      children={children}
      disabled={disabled}
      className={classNames('UploadMultiple__container', className)}
      beforeUpload={(file, fileList) => {
        const fileList_ = fileList.slice(0, maxCount);
        const index = fileList.findIndex(item => item.uid === file.uid);
        if (index > maxCount - 1) {
          return false;
        }
        return beforeUpload?.(file, fileList_) ?? true;
      }}
      customRequest={async ({ file }) => {
        if (valueState.length >= maxCount) {
          return;
        }
        if (!(file instanceof File)) {
          return;
        }
        const uid = v4();
        setValueState(state => {
          return state.concat({
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
        });
        try {
          const response = await request({
            file,
            onUploadProgress: event => {
              const progress = event.progress ?? 0;
              const percent = progress * 100;
              setValueState(state => {
                return state.map(item => {
                  if (item.uid === uid) {
                    return {
                      ...item,
                      progressPercent: percent,
                    };
                  }
                  return item;
                });
              });
            },
          });
          setValueState(state => {
            return state.map(item => {
              if (item.uid === uid) {
                return {
                  ...item,
                  response,
                  status: 'success',
                };
              }
              return item;
            });
          });
        } catch (error) {
          setValueState(state => {
            return state.map(item => {
              if (item.uid === uid) {
                return {
                  ...item,
                  status: 'failure',
                };
              }
              return item;
            });
          });
        }
      }}
    />
  );
};
