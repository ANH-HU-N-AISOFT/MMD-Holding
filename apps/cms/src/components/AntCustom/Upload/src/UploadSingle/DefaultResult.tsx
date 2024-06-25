import { CloseOutlined, FileTextOutlined } from '@ant-design/icons';
import { Progress } from '../components/Progress';
import { FileState } from '../types/FileState';

interface Props {
  fileState?: FileState<any>;
  onRemove: () => void;
  onClick: () => void;
  disabled?: boolean;
}

export const DefaultResult = ({ fileState, onRemove, onClick, disabled }: Props) => {
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
            {fileState.file.name}
          </div>
          {fileState.progressPercent !== undefined && (
            <Progress
              color={fileState.status === 'failure' ? 'red' : fileState.status === 'success' ? 'green' : 'blue'}
              percent={fileState.status === 'success' ? 100 : fileState.progressPercent}
              size="small"
            />
          )}
        </div>
        {!disabled && (
          <div className="flex shrink-0 grow justify-end">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200">
              <CloseOutlined
                className="hover:text-primary-base cursor-pointer text-sm text-neutral-700 transition-all"
                onClick={onRemove}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
