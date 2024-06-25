import { useBeforeUnload } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router';

interface UseCallbackPrompt {
  /** The condition upon which the popup should be shown */
  when: boolean | (() => boolean);
}

/**
 * Custom React hook to show a confirmation popup based on a condition.
 * @param {boolean|Function} options.when - The condition upon which the popup should be shown.
 * @returns {Object} - Returns an object with the following methods:
 *   - showPrompt: Function to programmatically trigger the prompt.
 *   - confirmNavigation: Function to programmatically confirm navigation.
 *   - cancelNavigation: Function to programmatically cancel navigation.
 * @example ```jsx
  const { showPrompt, confirmNavigation, cancelNavigation } = useCallbackPrompt(true);
  ...
  <DialogBox
    showDialog={showPrompt}
    confirmNavigation={confirmNavigation}
    cancelNavigation={cancelNavigation}
  />
 ```
 */

export const useCallbackPrompt = ({
  when,
}: UseCallbackPrompt): {
  showPrompt: boolean;
  confirmNavigation: () => void;
  cancelNavigation: () => void;
} => {
  const [whenState, setWhenState] = useState(when);
  const [showPrompt, setShowPrompt] = useState(false);

  const blocker = useBlocker(whenState);

  // Set to default if cancel navigation
  const cancelNavigation = (): void => {
    setWhenState(when);
    setShowPrompt(false);
  };

  // Set to default and run previous blocker if redirect
  const confirmNavigation = (): void => {
    setShowPrompt(false);
    blocker.proceed?.();
    setWhenState(when);
  };

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setShowPrompt(true);
      setWhenState(false);
    }
  }, [blocker]);

  const unloadCallback = (event: any): string => {
    event.preventDefault();
    event.returnValue = '';
    return '';
  };

  useBeforeUnload(unloadCallback);

  useEffect(() => {
    setWhenState(when);
  }, [when]);

  return {
    showPrompt,
    confirmNavigation,
    cancelNavigation,
  };
};
