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
  const queryCache = client.getQueryCache()

  const getSnapshot = React.useCallback(
    () => client.isFetching(filters),
    [client, filters],
  )
  return React.useSyncExternalStore(
    React.useCallback(
      (onStoreChange) =>
        queryCache.subscribe(notifyManager.batchCalls(onStoreChange)),
      [queryCache],
    ),
    getSnapshot,
    getSnapshot,
  )
}
