import { RouteObject } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import About from './components/About'
import { fetcher } from './query'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        index: true,
        loader: () => fetcher('/api/hello-world'),
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
]
