import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isBrowser } from 'utilities';
import type { FC } from 'react';
import './styles.css';

export interface Props {
  /** Indicates whether loading is complete or not */
  done: boolean;
  /** Duration of the progress bar in milliseconds */
  duration?: number;
  /** Class name for the container element */
  containerClassName?: string;
  /** Class name for the progress bar */
  barClassName?: string;
}

/**
 * A React component for a fixed progress loader.
 * It displays a progress bar at the top of the page to indicate loading status.
 */
export const FixedProgressLoader: FC<Props> = ({
  done,
  duration = 300,
  containerClassName = '',
  barClassName = '',
}) => {
  /** Counter to control the progress animation */
  const [count, setCount] = useState(0);

  /** State to track if loading is done */
  const [doneState, setDoneState] = useState(false);

  /** Reference to the interval used for the progress animation */
  const intervalRef = useRef(0);

  /** Reference to the timeout used for handling loading completion */
  const timeoutRef = useRef(0);

  /** Reference to the progress bar element in the DOM */
  const progressElement = useMemo(() => {
    if (isBrowser()) {
      return document.querySelector('.progress-element');
    }
    return;
  }, []);

  useEffect(() => {
    if (isBrowser()) {
      intervalRef.current = window.setInterval(
        () => {
          if (count < 9) {
            setCount(count => count + 1);
          } else {
            clearInterval(intervalRef.current);
          }
        },
        Math.min(duration + 200, 500),
      );
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [count, duration]);

  useEffect(() => {
    if (isBrowser()) {
      clearTimeout(timeoutRef.current);
      if (done) {
        setCount(10);
        timeoutRef.current = window.setTimeout(() => {
          setDoneState(true);
          clearTimeout(timeoutRef.current);
          progressElement?.remove();
        }, duration);
      } else {
        setCount(0);
        setDoneState(false);
        timeoutRef.current = window.setTimeout(() => {
          setDoneState(false);
          clearTimeout(timeoutRef.current);
          progressElement?.remove();
        }, duration);
      }
    }
    return () => {
      clearTimeout(timeoutRef.current);
      progressElement?.remove();
    };
  }, [done, duration, progressElement]);

  if (doneState) {
    return null;
  }

  return (
    <div className={classNames('FixedProgressLoader__container', containerClassName)}>
      <div
        className={classNames('FixedProgressLoader__bar', barClassName)}
        style={{ width: `${count * 10}%`, transition: `width ${duration}ms` }}
      />
    </div>
  );
};
