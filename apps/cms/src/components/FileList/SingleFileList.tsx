import { CloseOutlined, FileTextOutlined } from '@ant-design/icons';
import { Progress } from '../Progress/Progress';
import { getFileNameFromUrl } from '~/utils/functions/getFileNameFromUrl';

interface Props {
  fileState?: File | string;
  onRemove: () => void;
  onClick: () => void;
  disabled?: boolean;
}

export const SingleFileList = ({ fileState, onRemove, onClick, disabled }: Props) => {
  if (!fileState) {
    return null;
  }

  return (
    <div className="cursor-default rounded-xl border border-solid border-neutral-300 bg-white p-2">
      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <FileTextOutlined className="text-lg text-neutral-700" />
        </div>
        <div className="flex-auto basis-full items-center">
          <div
            className="hover:text-brand-base mb-1 cursor-pointer truncate text-left text-sm font-medium text-neutral-700 transition-all"
            onClick={onClick}
          >
            {typeof fileState === 'string' ? getFileNameFromUrl(fileState) : fileState.name}
          </div>
          <Progress color="green" percent={100} size="small" />
        </div>
        {!disabled && (
          <div className="flex shrink-0 grow cursor-pointer justify-end" onClick={onRemove}>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200">
              <CloseOutlined className="hover:text-primary-base text-sm text-neutral-700 transition-all" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
