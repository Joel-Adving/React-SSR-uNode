import { RouteObject, json } from 'react-router-dom'
import Home from './components/Home'
import Layout from './components/Layout'
import About from './components/About'

export const routes: RouteObject[] = [
  {
    index: true,
    path: '/',
    loader: () => json({ message: 'Welcome to React Router!' }),
    element: <Home />
    // children: [
    //   {
    //     index: true,
    //     loader: () => json({ message: 'Welcome to React Router!' }),
    //     element: <Home />
    //   },
    //   {
    //     path: 'about',
    //     element: <About />
    //   },
    //   // {
    //   //   path: 'dashboard',
    //   //   loader: dashboardLoader,
    //   //   element: <Dashboard />
    //   // },
    //   // {
    //   //   path: 'lazy',
    //   //   lazy: () => import('./lazy')
    //   // },
    //   // {
    //   //   path: 'redirect',
    //   //   loader: redirectLoader
    //   // },
    //   {
    //     path: '*',
    //     Component: () => <div>Not Found</div>
    //   }
    // ]
  },
  {
    path: '/about',
    element: <About />
  }
]
