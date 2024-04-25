import { useEffect } from 'react';
import { Navigate, useRouteError } from '~/overrides/@remix';

export const PageErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    // TODO: Sentry
    console.log(error);
  }, [error]);

  return <Navigate to="/500" />;
};
