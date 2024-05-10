import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  extra: ReactNode[];
  withQuestionMark?: boolean;
}

export const TooltipDetailInformation = ({ extra, title, withQuestionMark = true }: Props) => {
  if (withQuestionMark) {
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
  }
  return (
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
      <div>{title}</div>
    </Tooltip>
  );
};
