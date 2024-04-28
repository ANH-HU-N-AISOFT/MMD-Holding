import { Outlet } from '@remix-run/react';
import { Suspense } from 'react';
import { FixedProgressLoader, usePrevious } from 'reactjs';
import { ScrollRestoration, useNavigation } from '~/overrides/@remix';

export const RootLayout = () => {
  const navigation = useNavigation();
  const prevFormAction = usePrevious(navigation);
  return (
    <Suspense fallback={null}>
      <Outlet />
      <ScrollRestoration />
      <FixedProgressLoader
        hidden={!!prevFormAction?.formAction || !!navigation.formAction}
        done={navigation.state === 'idle'}
      />
    </Suspense>
  );
};
