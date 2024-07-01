import path from 'path'
import { App, serveStatic } from '@oki.gg/unode'
import { fileURLToPath } from 'url'
import { handleRoutes } from './entry.server'

const app = new App()
  .get('/static/*', serveStatic(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public')))
  .get('/*', (req, res) => {
    handleRoutes(req, res)
  })
  .listen(3000)
