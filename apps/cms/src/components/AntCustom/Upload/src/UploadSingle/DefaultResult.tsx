import { CloseOutlined, FileTextOutlined } from '@ant-design/icons';
import { Progress } from '../components/Progress';
import { FileState } from '../types/FileState';

interface Props {
  fileState?: FileState<any>;
  onRemove: () => void;
}

export const DefaultResult = ({ fileState, onRemove }: Props) => {
  if (!fileState) {
    return null;
  }

  return (
    <div className="rounded-xl border border-solid border-neutral-300 p-2 bg-white">
      <div className="flex gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <FileTextOutlined className="text-lg text-neutral-700" />
        </div>
        <div className="flex-auto basis-full items-center">
          <div className="text-left mb-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-neutral-700">
            {fileState.file.name}
          </div>
          {fileState.progressPercent !== undefined && (
            <Progress
              color={fileState.status === 'failure' ? 'red' : fileState.status === 'success' ? 'green' : 'blue'}
              percent={fileState.progressPercent}
              size="small"
            />
          )}
        </div>
        <div className="flex flex-shrink-0 flex-grow justify-end">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200">
            <CloseOutlined
              className="cursor-pointer text-sm text-neutral-700 transition-all hover:text-primary-base"
              onClick={onRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
