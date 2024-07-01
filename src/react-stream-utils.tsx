import { type Request, Response, uNodeWritable } from '@oki.gg/unode'
import {
  StaticHandlerContext,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter
} from 'react-router-dom/server.js'
import { renderToPipeableStream } from 'react-dom/server'
import { routes } from './routes'
import { getClientScript } from './utils'
import React, { ElementType } from 'react'
import { createFetchRequest } from './fetch'

const handler = createStaticHandler(routes)

export async function streamRoutes(req: Request, res: Response) {
  const fetchRequest = createFetchRequest(req, res)
  const context = (await handler.query(fetchRequest)) as StaticHandlerContext
  const router = createStaticRouter(handler.dataRoutes, context)

  const { pipe } = renderToPipeableStream(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} nonce="the-nonce" />
    </React.StrictMode>,
    {
      onShellReady() {
        if (!res.done) {
          res.cork(() => {
            res.writeHeader('Content-Type', 'text/html')
            const writable = new uNodeWritable(res)
            pipe(writable)
          })
        }
      }
    }
  )
}

/**
 * @example
 * // needs below to work
 * hydrateRoot(document.getElementById('root')!, <PageComponent />)
 */
export function streamPage(PageComponent: ElementType, res: Response, { title: title = 'My app' }) {
  const clientScript = getClientScript()
  if (!clientScript) {
    res.status(500).end('Client script not found')
    return
  }
  const { pipe } = renderToPipeableStream(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>
        <div id="root">
          <PageComponent />
        </div>
      </body>
    </html>,
    {
      bootstrapScripts: [clientScript],
      onShellReady() {
        if (!res.done) {
          res.cork(() => {
            res.writeHeader('Content-Type', 'text/html')
            const writable = new uNodeWritable(res)
            pipe(writable)
          })
        }
      }
    }
  )
}
