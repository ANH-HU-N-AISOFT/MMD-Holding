import { ShouldRevalidateFunction } from '~/overrides/remix';

const paths: string[] = [];

export const preventRevalidateOnDetailPage: ShouldRevalidateFunction = ({ currentUrl }) => {
  if (paths.find(item => item === currentUrl.pathname)) {
    return true;
  }
  return false;
};
