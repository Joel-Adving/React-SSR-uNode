import { FetchQueryOptions, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export function fetcher(endpoint: string, options?: FetchQueryOptions<any, Error, any, string[], never>) {
  return queryClient.fetchQuery({
    queryKey: [endpoint],
    queryFn: () => fetch(`${getBaseUrl()}${endpoint}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    ...options
  })
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return 'http://localhost:3000'
}
