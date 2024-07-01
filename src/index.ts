import { serveStatic, App } from '@oki.gg/unode'
import path from 'path'
import { renderToPipeableStream } from 'react-dom/server'
import ReactApp from './App'
import { fileURLToPath } from 'url'
import { NodeWritable, getClientScript } from './utils'

const app = new App()
  .get('/*', serveStatic(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public')))

  .get('*', (req, res) => {
    const clientScript = getClientScript()

    res.cork(() => {
      if (!clientScript) {
        res.writeStatus('500 Internal Server Error').end('Client script not found')
        return
      }

      const { pipe } = renderToPipeableStream(ReactApp(), {
        bootstrapScripts: [clientScript],
        onShellReady() {
          console.log('Shell is ready')
          res.writeHeader('Content-Type', 'text/html')
          const writable = new NodeWritable(res)
          pipe(writable)
        },
        onAllReady() {
          console.log('All content is ready')
          if (!res.done) {
            res.cork(() => res.end())
          }
        },
        onError(error) {
          console.error(error)
          if (!res.done) {
            res.cork(() => {
              res.writeStatus('500 Internal Server Error').end('Internal Server Error')
            })
          }
        }
      })
    })
  })
  .listen(3000)
