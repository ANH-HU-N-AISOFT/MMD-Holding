import classNames from 'classnames';
import * as React from 'react';

export const IconReceiptLinear = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.5 11.3V7.04C20.5 3.01 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01 3.5 7.04V18.3C3.5 20.96 4.96 21.59 6.73 19.69L6.74 19.68C6.91558 19.4764 7.13549 19.3158 7.38283 19.2104C7.63018 19.1051 7.89838 19.0578 8.16683 19.0723C8.43529 19.0868 8.69685 19.1626 8.93142 19.294C9.166 19.4253 9.36735 19.6087 9.52 19.83L10.53 21.18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 7H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M18.2111 14.7699L14.6721 18.3099C14.5201 18.4756 14.4164 18.6796 14.3721 18.8999L14.1821 20.2499C14.1583 20.3546 14.1614 20.4636 14.1911 20.5668C14.2209 20.6699 14.2763 20.7638 14.3522 20.8398C14.4282 20.9157 14.5221 20.9711 14.6252 21.0009C14.7284 21.0306 14.8374 21.0337 14.9421 21.0099L16.2921 20.8199C16.5132 20.7778 16.7178 20.6738 16.8821 20.5199L20.4221 16.9799C20.5986 16.8536 20.7424 16.687 20.8416 16.494C20.9409 16.3009 20.9926 16.087 20.9926 15.8699C20.9926 15.6529 20.9409 15.4389 20.8416 15.2459C20.7424 15.0529 20.5986 14.8863 20.4221 14.7599C20.2953 14.585 20.1286 14.4428 19.9359 14.345C19.7432 14.2473 19.5301 14.1968 19.314 14.1978C19.0979 14.1987 18.8852 14.2511 18.6934 14.3506C18.5016 14.4501 18.3363 14.5939 18.2111 14.7699V14.7699Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.699 15.28C17.8457 15.8103 18.1274 16.2935 18.5164 16.6826C18.9055 17.0716 19.3887 17.3533 19.919 17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
