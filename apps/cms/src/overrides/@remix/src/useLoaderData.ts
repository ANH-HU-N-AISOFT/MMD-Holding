import { useLoaderData as useLoaderDataReactRouterDom } from 'react-router-dom';
import { AppData, SerializeFrom } from './types';

// @ts-ignore
export declare function useLoaderData<T = AppData>(): SerializeFrom<T>;

// @ts-ignore
export const useLoaderData = useLoaderDataReactRouterDom;
