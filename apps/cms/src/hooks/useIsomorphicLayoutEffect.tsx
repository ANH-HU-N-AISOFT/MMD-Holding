import { useEffect, useLayoutEffect } from 'react';

// FIXME: Di chuyển vào lib "reactjs"
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
