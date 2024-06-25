import classNames from 'classnames';
import * as React from 'react';

export const IconHeartEditLinear = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.49 12C21.8282 10.9292 22.0002 9.81289 22 8.68998C22.0021 7.95782 21.8599 7.23242 21.5816 6.55522C21.3033 5.87801 20.8943 5.26227 20.378 4.74316C19.8617 4.22406 19.2482 3.81176 18.5725 3.52982C17.8968 3.24787 17.1721 3.10181 16.44 3.09998C15.5762 3.09955 14.7244 3.30204 13.9532 3.69111C13.182 4.08019 12.5129 4.64498 12 5.33998C11.3023 4.40063 10.3255 3.70595 9.2092 3.35528C8.0929 3.00462 6.8943 3.01594 5.78481 3.38761C4.67533 3.75929 3.71179 4.47229 3.032 5.42464C2.35221 6.377 1.99098 7.51993 1.99998 8.68998C1.99998 15.69 8.47998 19.82 11.38 20.82C11.5804 20.8835 11.7898 20.9139 12 20.91"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.21 15.74L15.671 19.28C15.519 19.4456 15.4153 19.6497 15.371 19.87L15.181 21.22C15.1572 21.3247 15.1603 21.4337 15.19 21.5368C15.2198 21.64 15.2752 21.7339 15.3511 21.8098C15.4271 21.8857 15.521 21.9412 15.6241 21.9709C15.7273 22.0007 15.8363 22.0038 15.941 21.98L17.291 21.79C17.5121 21.7479 17.7167 21.6438 17.881 21.49L21.421 17.95C21.5975 17.8237 21.7413 17.6571 21.8405 17.464C21.9398 17.271 21.9915 17.0571 21.9915 16.84C21.9915 16.623 21.9398 16.409 21.8405 16.216C21.7413 16.0229 21.5975 15.8563 21.421 15.73C21.2943 15.5549 21.1277 15.4125 20.935 15.3146C20.7423 15.2167 20.529 15.1662 20.3129 15.1671C20.0968 15.1681 19.884 15.2206 19.6922 15.3202C19.5004 15.4198 19.3351 15.5637 19.21 15.74V15.74Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.7 16.25C18.8468 16.7803 19.1284 17.2635 19.5175 17.6525C19.9065 18.0416 20.3897 18.3232 20.92 18.47"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
