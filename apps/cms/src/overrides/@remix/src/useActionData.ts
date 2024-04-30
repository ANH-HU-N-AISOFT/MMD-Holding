import { useActionData as useActionDataReactRouterDom } from 'react-router-dom';
import { SerializeFrom } from './types';

// @ts-ignore
export declare function useActionData<T = AppData>(): SerializeFrom<T> | undefined;

// @ts-ignore
export const useActionData = useActionDataReactRouterDom;
