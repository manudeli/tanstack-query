'use client'
import * as React from 'react'
import { notifyManager } from '@tanstack/query-core'
import { useQueryClient } from './QueryClientProvider'
import type { QueryClient, QueryFilters } from '@tanstack/query-core'

export function useIsFetching(
  filters?: QueryFilters,
  queryClient?: QueryClient,
): number {
  const client = useQueryClient(queryClient)

  return React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) =>
        client
          .getQueryCache()
          .subscribe(notifyManager.batchCalls(onStoreChange)),
      [client],
    ),
    () => client.isFetching(filters),
    () => client.isFetching(filters),
  )
}
