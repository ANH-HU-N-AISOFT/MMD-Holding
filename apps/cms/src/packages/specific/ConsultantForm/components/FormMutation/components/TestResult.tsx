import { DeleteOutlined, InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { range } from 'ramda';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AntRawImage, UploadMultiple, notification, FileState } from 'reactjs';
import { uploadImage } from '../../../services/uploadImage';
import { FormValues } from '../FormMutation';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
}

interface StateItem {
  path: string;
  order: number;
}
export const TestResult = ({ disabledField, form }: Props) => {
  const { t } = useTranslation(['consultant_form', 'common']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const examResults = watch('examResults') ?? [];
  const [quantityItemLoading, setQuantityItemLoading] = useState(0);

  const [uploadFilesState, setUploadFilesState] = useState<FileState<StateItem>[]>([]);

  useEffect(() => {
    setUploadFilesState(
      examResults?.map((item, index) => ({
        status: 'success',
        uid: item,
        file: { name: item, size: 0 },
        response: { path: item, order: examResults.length - index },
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const examResults = uploadFilesState
      ?.filter((item): item is Required<FileState<StateItem>> => item.status === 'success')
      .map(item => ({ path: item.response.path, order: item.response.order }));
    setValue(
      'examResults',
      // sortWith([descend(prop('order'))], examResults ?? []).map(item => item.path),
      examResults.map(item => item.path),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFilesState]);

  return (
    <div className="grid grid-cols-1 gap-3">
      <UploadMultiple<StateItem>
        disabled={disabledField}
        accept="image/png, image/jpg, image/jpeg"
        value={uploadFilesState}
        onStateChange={nextState => {
          setQuantityItemLoading(nextState?.filter(item => item.status === 'loading').length ?? 0);
          setUploadFilesState(nextState ?? []);
          if (errors.examResults) {
            trigger('examResults');
          }
        }}
        request={async ({ file }) => {
          try {
            const response = await uploadImage({ file });
            return { path: response.path, order: Date.now() };
          } catch (error) {
            notification.error({
              message: t('common:upload_failure'),
              description: handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error)),
            });
            return;
          }
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
        <p className="ant-upload-hint">Hỗ trợ tải lên hình ảnh và có thể tải lên nhiều tệp cùng lúc.</p>
      </UploadMultiple>
      <div className="flex flex-wrap gap-2">
        <AntRawImage.PreviewGroup>
          {examResults?.map(item => {
            return (
              <div
                key={item}
                className="relative grid grid-cols-1 gap-1 overflow-hidden rounded-xl border border-solid border-neutral-200 bg-neutral-50"
              >
                <div className={classNames('text-right mt-2 mr-2', disabledField ? 'hidden' : 'block')}>
                  <DeleteOutlined
                    onClick={() =>
                      setValue(
                        'examResults',
                        examResults.filter(stateItem => stateItem !== item),
                      )
                    }
                    className="text-status-red right-2 top-2 cursor-pointer text-sm"
                  />
                </div>
                <AntRawImage
                  style={{ borderTop: '1px solid' }}
                  className="!h-40 !w-40 shrink-0 grow-0 !border-t-neutral-200 bg-black/5 object-contain"
                  src={item}
                />
              </div>
            );
          })}
        </AntRawImage.PreviewGroup>
        {range(0, quantityItemLoading).map(item => {
          return (
            <div
              key={item}
              className="flex h-full w-40 shrink-0 grow-0 items-center justify-center rounded-lg bg-black/20"
            >
              <LoadingOutlined className="text-4xl" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
