import path from 'path'
import { App, serveStatic } from '@oki.gg/unode'
import { fileURLToPath } from 'url'
import { handleRoutes } from './entry.server'

const staticDir = serveStatic(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public'))

const app = new App()
  .get('/*', handleRoutes)
  .get('/static/*', staticDir)
  .get('/api/hello-world', () => ({ message: 'Hello, World! From the server!' }))
  .listen(3000)
