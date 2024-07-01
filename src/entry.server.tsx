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
import { createFetchRequest } from './fetch'

const handler = createStaticHandler(routes)

export async function handleRoutes(req: Request, res: Response) {
  const fetchRequest = createFetchRequest(req, res)
  const context = (await handler.query(fetchRequest)) as StaticHandlerContext
  const router = createStaticRouter(handler.dataRoutes, context)
  const appHtml = renderToString(<StaticRouterProvider router={router} context={context} />)
  const template = await readFile(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public/index.html'),
    'utf8'
  )
  const html = template.replace('<!--app-html-->', appHtml)
  res.send(html)
}
