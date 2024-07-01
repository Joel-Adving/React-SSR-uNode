import { Outlet } from 'react-router-dom'
import { queryClient } from '../store'
import { QueryClientProvider } from '@tanstack/react-query'

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
