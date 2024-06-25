import classNames from 'classnames';
import * as React from 'react';

export const IconHomeLinear = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 18V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M10.0697 2.81986L3.13973 8.36986C2.73386 8.7304 2.42102 9.18358 2.22778 9.6909C2.03453 10.1982 1.96659 10.7447 2.02973 11.2839L3.35973 19.2439C3.50002 19.9534 3.8773 20.5943 4.42967 21.0612C4.98204 21.5282 5.6767 21.7936 6.39973 21.8139H17.5967C18.3188 21.7902 19.0117 21.5236 19.5634 21.0572C20.1151 20.5908 20.4933 19.9519 20.6367 19.2439L21.9667 11.2839C22.0245 10.7456 21.9541 10.2014 21.7612 9.69557C21.5682 9.18979 21.2583 8.73687 20.8567 8.37386L13.9297 2.82986C13.3735 2.4121 12.697 2.18541 12.0014 2.1836C11.3057 2.1818 10.6281 2.40499 10.0697 2.81986V2.81986Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
