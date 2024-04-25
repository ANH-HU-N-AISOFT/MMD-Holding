import { useMediaQuery } from './useMediaQuery';

export const useMobile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return { isMobile };
};
