import { redirect as redirectReactRouter } from 'react-router-dom';
import { InteralError } from '~/packages/common/InteralError/components/Notification';

export const redirect = <T extends string>(
  url: T,
  init: T extends '/500' ? ResponseInit & { reason: any } : ResponseInit | undefined,
): Response => {
  if (init && 'reason' in init) {
    InteralError.setError(init.reason);
  }
  return redirectReactRouter(url, init);
};
