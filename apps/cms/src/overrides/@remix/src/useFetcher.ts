import { FetcherWithComponents, useFetcher as useFetcherReactRouterDom } from 'react-router-dom';
import { SerializeFrom } from './types';

// @ts-ignore
export declare function useFetcher<TData = any>(): FetcherWithComponents<SerializeFrom<TData>>;

// @ts-ignore
export const useFetcher = useFetcherReactRouterDom;
