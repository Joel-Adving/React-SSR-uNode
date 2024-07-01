import path from 'path'
import { readdirSync } from 'fs'
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
