import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { isBrowser } from 'utilities';

export interface Props extends PropsWithChildren {
  skeleton?: ReactNode;
}

export const ClientSideOnly: FC<Props> = ({ children, skeleton = null }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(isBrowser());
  }, []);

  if (!isClient) {
    return skeleton;
  }

  return children;
};
