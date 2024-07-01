import { readdirSync } from 'fs'
import path from 'path'
import { Writable } from 'stream'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')
const publicDir = path.join(distDir, 'public')

export function getClientScript() {
  const assetsDir = path.join(publicDir, 'assets')
  const files = readdirSync(assetsDir)
  const jsFile = files.find((file) => file.endsWith('.js'))
  if (!jsFile) {
    throw new Error('No client script found in assets directory')
  }
  return `/assets/${jsFile}`
}

export class NodeWritable extends Writable {
  private res: any
  private isEnded: boolean = false

  constructor(res: any) {
    super()
    this.res = res
  }

  _write(chunk: any, encoding: any, callback: any) {
    if (this.isEnded) {
      callback()
      return
    }

    this.res.cork(() => {
      const arrayBufferChunk = chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength)

      const [ok, done] = this.res.tryEnd(arrayBufferChunk, chunk.byteLength)

      if (done) {
        this.isEnded = true
        this.res.end()
        callback()
      } else if (!ok) {
        this.res.onWritable((offset: any) => {
          this.res.cork(() => {
            const [ok, done] = this.res.tryEnd(arrayBufferChunk.slice(offset), chunk.byteLength)
            if (done) {
              this.isEnded = true
              this.res.end()
            }
            callback()
            return ok
          })
        })
      } else {
        callback()
      }
    })
  }

  _final(callback: any) {
    if (!this.isEnded) {
      this.res.cork(() => {
        this.res.end()
        this.isEnded = true
        callback()
      })
    } else {
      callback()
    }
  }
}
