import { StrictMode } from 'react'
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { hydrateRoot } from 'react-dom/client'

hydrate()

async function hydrate() {
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy)

  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy!()
        Object.assign(m.route, { ...routeModule, lazy: undefined })
      })
    )
  }

  const router = createBrowserRouter(routes)

  hydrateRoot(
    document.getElementById('app')!,
    <StrictMode>
      <RouterProvider router={router} fallbackElement={null} />
    </StrictMode>
  )
}
