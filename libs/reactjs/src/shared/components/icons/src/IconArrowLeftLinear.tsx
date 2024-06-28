import classNames from 'classnames';
import * as React from 'react';

export const IconArrowLeftLinear = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.002 19.92L8.479 13.4C8.10918 13.0279 7.90161 12.5246 7.90161 12C7.90161 11.4753 8.10918 10.972 8.479 10.6L15.002 4.07996"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
