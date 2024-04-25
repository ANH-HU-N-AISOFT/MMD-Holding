import { useEffect } from 'react';
import { Navigate, useRouteError } from '~/overrides/@remix';
import { InteralError } from '~/packages/common/InteralError/components/Notification';

export const PageErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    InteralError.setError(error);
  }, [error]);

  return <Navigate to="/500" />;
};
