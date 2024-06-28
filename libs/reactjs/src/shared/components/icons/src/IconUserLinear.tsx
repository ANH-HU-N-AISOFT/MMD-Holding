import classNames from 'classnames';
import * as React from 'react';

export const IconUserLinear = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.5834 7.41671C16.5834 8.3232 16.3146 9.20935 15.811 9.96307C15.3074 10.7168 14.5915 11.3043 13.754 11.6512C12.9166 11.9981 11.995 12.0888 11.1059 11.912C10.2168 11.7351 9.40017 11.2986 8.75918 10.6576C8.11819 10.0166 7.68167 9.19995 7.50482 8.31087C7.32797 7.42179 7.41873 6.50024 7.76564 5.66274C8.11254 4.82525 8.69999 4.10943 9.45372 3.6058C10.2074 3.10218 11.0936 2.83337 12.0001 2.83337C13.2157 2.83337 14.3814 3.31626 15.241 4.1758C16.1005 5.03534 16.5834 6.20113 16.5834 7.41671Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.8741 21.1667C19.8741 17.6192 16.3449 14.75 11.9999 14.75C7.6549 14.75 4.12573 17.6192 4.12573 21.1667"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
