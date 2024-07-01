import path from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function injectScript() {
  return {
    name: 'inject-script',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist/public')
      const htmlFilePath = path.join(distDir, 'static/index.html')
      const jsFiles = readdirSync(path.join(distDir, 'static')).filter((file) => file.endsWith('.js'))
      if (jsFiles.length > 0) {
        const scriptTag = `<script type="module" src="/static/${jsFiles[0]}"></script>`
        let htmlContent = readFileSync(htmlFilePath, 'utf-8')
        htmlContent = htmlContent.replace('%injectScript%', scriptTag)
        writeFileSync(htmlFilePath, htmlContent, 'utf-8')
      }
    }
  }
}
