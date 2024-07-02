import { Outlet } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../query'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <main style={{ maxWidth: 900, width: '100%', margin: '50px auto' }}>
        <h1>Layout</h1>
        <Outlet />
      </main>
    </QueryClientProvider>
  )
}
