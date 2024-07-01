import { QueryClient } from '@tanstack/react-query'
import { atom } from 'jotai'

export const queryClient = new QueryClient()

export function fetcher(endpoint: string) {
  return queryClient.fetchQuery({
    queryKey: [endpoint],
    queryFn: () => fetch(`http://localhost:3000${endpoint}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5 // cache for 5 minutes
  })
}

export const countAtom = atom(0)
