import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  extra: ReactNode[];
}

export const OptionWithDetailInformation = ({ extra, title }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {title}
      <Tooltip
        overlayClassName="!max-w-[initial]"
        title={
          <div>
            {extra.map((item, index) => {
              return (
                <div key={index} className="whitespace-nowrap">
                  {item}
                </div>
              );
            })}
          </div>
        }
      >
        <QuestionCircleOutlined className="text-neutral-400" />
      </Tooltip>
    </div>
  );
};
