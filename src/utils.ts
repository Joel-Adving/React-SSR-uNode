import { Request, Response } from '@oki.gg/unode'

export function createFetchRequest(req: Request, res: Response) {
  const origin = `http://${req.getHeader('host')}`
  const url = new URL(req.getUrl(), origin)

  const controller = new AbortController()
  res.onAborted(() => {
    controller.abort()
  })

  const headers = new Headers()
  req.forEach((key, value) => {
    headers.append(key, value)
  })

  const method = req.getCaseSensitiveMethod()

  const init = {
    method,
    headers,
    signal: controller.signal
  }

  if (method !== 'GET' && method !== 'HEAD') {
    // @ts-ignore
    init.body = req.body()
  }

  return new Request(url.href, init)
}
