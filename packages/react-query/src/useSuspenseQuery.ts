import { QueryObserver } from '@tanstack/query-core'
import { useBaseQuery } from './useBaseQuery'
import type { OmitKeyof, QueryClient, QueryKey } from '@tanstack/query-core'
import type { UseQueryOptions, UseQueryResult } from './types'

export interface UseSuspenseQueryResult<TData = unknown, TError = unknown>
  extends OmitKeyof<
    UseQueryResult<TData, TError>,
    keyof Pick<UseQueryResult, 'isPlaceholderData'>
  > {
  data: TData
  status: 'success'
}

export type UseSuspenseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = OmitKeyof<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  | 'suspense'
  | 'useErrorBoundary'
  | 'enabled'
  | 'placeholderData'
  | 'networkMode'
>

export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  context?: React.Context<QueryClient | undefined>,
) {
  return useBaseQuery(
    {
      ...options,
      enabled: true,
      useErrorBoundary: true,
      suspense: true,
      placeholderData: undefined,
      networkMode: 'always',
      context,
    },
    QueryObserver,
  ) as UseSuspenseQueryResult<TData, TError>
}
