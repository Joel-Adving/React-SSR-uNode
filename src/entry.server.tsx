import { type Request, Response } from '@oki.gg/unode'
import {
  StaticHandlerContext,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter
} from 'react-router-dom/server.js'
import { renderToString } from 'react-dom/server'
import { routes } from './routes'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import { createFetchRequest } from './utils'

const handler = createStaticHandler(routes)

export async function handleRoutes(req: Request, res: Response) {
  const fetchRequest = createFetchRequest(req, res)
  const context = (await handler.query(fetchRequest)) as StaticHandlerContext
  const router = createStaticRouter(handler.dataRoutes, context)
  const appHtml = renderToString(<StaticRouterProvider router={router} context={context} />)
  const template = await readFile(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public/static/index.html'),
    'utf8'
  )
  if (!res.done) {
    res.cork(() => {
      res.writeHeader('Content-Type', 'text/html')
      res.end(template.replace('<!--app-html-->', appHtml))
    })
  }
}
