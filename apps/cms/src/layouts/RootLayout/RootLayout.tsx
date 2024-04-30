import { Suspense } from 'react';
import { FixedProgressLoader, usePrevious } from 'reactjs';
import { Outlet, ScrollRestoration, useNavigation } from '~/overrides/@remix';

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
