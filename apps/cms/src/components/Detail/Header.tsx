import { ArrowLeftOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

interface Props {
  onBack?: () => void;
  title: ReactNode;
}

export const Header = ({ title, onBack }: Props) => {
  return (
    <div className="flex items-center gap-3 text-xl font-bold mb-4">
      <ArrowLeftOutlined className="cursor-pointer" onClick={onBack} />
      {title}
    </div>
  );
};
