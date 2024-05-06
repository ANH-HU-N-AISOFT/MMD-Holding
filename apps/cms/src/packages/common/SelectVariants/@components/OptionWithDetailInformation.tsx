import { Tooltip } from 'antd';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  extra: ReactNode[];
}

export const OptionWithDetailInformation = ({ extra, title }: Props) => {
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
